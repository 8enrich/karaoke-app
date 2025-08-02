from fastapi import APIRouter, Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse
from sse_starlette import EventSourceResponse
import qrcode
import asyncio

from settings import CIFRA_URL, YT_URL, is_admin, api_key
from song import SongDb
from user import UserDb
from user_routes import router as user_router
from song_routes import router as song_router
import json
import os

app = FastAPI()
router = APIRouter()

async def event_stream():
    while True:
        queue = await get_queue()
        yield f"{json.dumps(queue)}"
        await asyncio.sleep(1)

@router.get("/queue")
async def queue_sse():
    return EventSourceResponse(event_stream(), ping=30)

async def get_queue():
    return await SongDb.find_all()

@router.get("/next")
@is_admin
async def next(key: str = Depends(api_key)):
    queue = await SongDb.find_all()
    if len(queue) == 0:
        raise HTTPException(detail="Não há músicas na fila", status_code=500)
    song = None
    while True:
        try:
            song = await SongDb.remove(SongDb.last_id)
            user = await UserDb.find(song.id_user)
            user.songs.remove(song.id)
            break
        except HTTPException:
            SongDb.last_id += 1
    search_query = song.name.lower() + ' ' + song.artist.lower()
    yt_url = song.link if song.link else YT_URL + search_query
    url = yt_url if song.sing else CIFRA_URL + search_query
    return url

@router.get("/admin")
@is_admin
async def admin(key: str = Depends(api_key)):
    return True

def generate_qr(data: str, file_name: str, darkMode: bool):
    file_path = os.path.join("/home/enrich/projects/python/karaoke/front/public/", file_name)
    if os.path.exists(file_path):
        return file_path
    
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data("http://" + data)
    qr.make(fit=True)

    img = qr.make_image(
        fill_color='black' if not darkMode else 'white', 
        back_color='white' if not darkMode else "black"
    )
    img.save(file_path)    

@router.get("/qr")
@is_admin
async def get_qr(ip: str, darkMode: bool, key: str = Depends(api_key)):
    file_name = f"{ip}-{"darkMode" if darkMode else "lightMode"}.png"
    data = ip + ":3000"
    generate_qr(data, file_name, darkMode)
    return file_name

app.include_router(router)
app.include_router(user_router, prefix='/user', tags=['user'])
app.include_router(song_router, prefix='/song', tags=['song'])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"]
)

@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")
