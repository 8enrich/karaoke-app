import asyncio
import json
from fastapi import APIRouter, Depends, HTTPException
from settings import verify_key
from song import SongParams, SongDb, UpdateSongParams
from user import UserModel
from user_routes import get_user
from sse_starlette import EventSourceResponse

router = APIRouter()


@router.post("")
async def create_song(params: SongParams, key: str = Depends(verify_key)):
    user = await get_user(key)
    if len(user.songs) == 3:
        raise HTTPException(
            detail="Você já possui 3 músicas na fila. Espere uma delas sair para adicionar mais músicas",
            status_code=500,
        )
    song = await SongDb.create(
        params.name, params.link, key, params.artist, params.sing
    )
    user.songs.append(song.id)
    return await song.to_dto()


async def event_stream(key: str):
    while True:
        songs = await get_songs(key)
        yield f"{json.dumps(songs)}"
        await asyncio.sleep(1)


@router.get("")
async def songs(key: str = Depends(verify_key)):
    return EventSourceResponse(event_stream(key), ping=60)


async def get_songs(key: str = Depends(verify_key)):
    user = await get_user(key)
    songs = []
    for id in user.songs:
        song = await SongDb.find(id)
        if not song:
            continue
        songs.append(await song.to_dto())
    return songs


@router.get("/{id}")
async def get_song(id: int):
    song = await SongDb.find(id)
    if not song:
        raise HTTPException(detail="Música não encontrada", status_code=404)
    return song


async def can_edit(user: UserModel, id: int):
    if id not in user.songs:
        raise HTTPException(detail="Você não pode editar essa música", status_code=401)
    return True


@router.put("/{id}")
async def update_song(
    params: UpdateSongParams, id: int, key: str = Depends(verify_key)
):
    user = await get_user(key)
    song = await get_song(id)
    if await can_edit(user, id):
        song.name = params.name if params.name is not None else song.name
        song.link = params.link if params.link is not None else song.link
        song.artist = params.artist if params.artist is not None else song.artist
        song.sing = params.sing if params.sing is not None else song.sing
        return HTTPException(detail="Música modificada com sucesso", status_code=200)


@router.delete("/{id}")
async def remove_song(id: int, key: str = Depends(verify_key)):
    user = await get_user(key)
    if await can_edit(user, id):
        song = await SongDb.remove(id)
        user.songs.remove(id)
        return song
