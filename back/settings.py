from functools import wraps
from fastapi import HTTPException, Depends
from fastapi.security import APIKeyHeader
from os import getenv
from dotenv import load_dotenv

from user import UserDb

load_dotenv()

MAX_USERS_QUANTITY = 50
YT_URL = "https://www.youtube.com/results?search_query=karaoke "
CIFRA_URL = "https://www.cifraclub.com.br/?q="

admin_key = getenv("ADMIN_KEY")

api_key = APIKeyHeader(name="auth")

def verify_key(key: str = Depends(api_key)):
    if key not in UserDb.users.keys():
        raise HTTPException(detail="Por favor, crie um usuário primeiro", status_code=500)
    return key

def is_admin(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        key = kwargs.get('key')
        if key != admin_key:
            raise HTTPException(detail="Você não tem permissão para acessar", status_code=401) 
        return await func(*args, **kwargs)
    return wrapper
