from fastapi import APIRouter, Depends, HTTPException
from settings import MAX_USERS_QUANTITY, verify_key
from user import UserParams, UserDb

router = APIRouter()

@router.post("")
async def create_user(params: UserParams):
    if len(UserDb.users.keys()) == MAX_USERS_QUANTITY:
        raise HTTPException(detail="Já há a quantidade máxima de usuários", status_code=500)
    user = await UserDb.create(params.name)
    return HTTPException(detail=user.id, status_code=201)

@router.get("")
async def get_user(key: str = Depends(verify_key)):
    user = await UserDb.find(key)
    if not user:
        raise HTTPException(detail="Usuário não encontrado", status_code=404)
    return user

@router.put("")
async def update_user(params: UserParams, key: str = Depends(verify_key)):
    user = await get_user(key)
    user.name = params.name if params.name else user.name
    return HTTPException(detail="Usuário modificado com sucesso", status_code=200)
