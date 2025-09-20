from fastapi import HTTPException
from pydantic import BaseModel, field_validator
from secrets import token_hex
from os import getenv
from dotenv import load_dotenv

load_dotenv()

admin_key = getenv("ADMIN_KEY")


class UserParams(BaseModel):
    name: str

    @field_validator("name")
    def validate_name(cls, value):
        if len(value) > 50:
            raise HTTPException(
                detail={"name": "Seu nome deve conter até 50 caracteres"},
                status_code=500,
            )
        if not value.strip():
            raise HTTPException(
                detail={"name": "Por favor, digite um nome"}, status_code=500
            )
        return value


class UserModel:
    def __init__(self, id: str, name: str):
        self.id = id
        self.name = name
        self.songs: list[int] = []

    def to_dto(self):
        return {"name": self.name, "songs": self.songs}


class UserDb:
    users = dict()

    @classmethod
    async def create(cls, name: str) -> UserModel:
        id = name if name == admin_key else token_hex(16)
        user = await cls.find(id)
        if user:
            raise HTTPException(detail="Usuário já existe", status_code=500)
        new_user = UserModel(id, name)
        cls.users[id] = new_user
        return new_user

    @classmethod
    async def find(cls, id: str) -> UserModel:
        return cls.users.get(id, None)
