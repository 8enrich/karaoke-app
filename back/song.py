from fastapi import HTTPException
from typing import Optional
from pydantic import BaseModel, field_validator
from re import match

from user import UserDb


def is_youtube_video_link(url: str) -> bool:
    youtube_video_regex = (
        r"(https?://)?(www\.)?youtube\.com/watch\?v=[\w-]+"
        r"|https?://youtu\.be/[\w-]+"
    )
    return bool(match(youtube_video_regex, url))


def validate_name(value):
    if len(value) > 50:
        raise HTTPException(
            detail={"song": "O nome da música deve conter até 50 caracteres"},
            status_code=500,
        )
    if not value.strip():
        raise HTTPException(
            detail={"song": "Por favor, digite uma música"}, status_code=500
        )
    return value


def validate_artist(value):
    if value is not None and len(value) > 50:
        raise HTTPException(
            detail={"artist": "O nome do artista deve conter até 50 caracteres"},
            status_code=500,
        )
    return value


def validate_link(value):
    if value is not None and len(value) > 100:
        raise HTTPException(
            detail={"link": "O link da música deve conter até 100 caracteres"},
            status_code=500,
        )
    if value and not is_youtube_video_link(value):
        raise HTTPException(
            detail={"link": "Link inválido, coloque um link do youtube"},
            status_code=500,
        )
    return value


def validate_sing(value):
    if value not in (True, False):
        raise HTTPException(
            detail={"sing": "É necessário dizer se você quer cantar ou tocar a música"},
            status_code=500,
        )
    return value


class SongParams(BaseModel):
    name: str
    artist: Optional[str] = None
    link: Optional[str] = None
    sing: bool

    @field_validator("name")
    def validate_name(cls, value):
        return validate_name(value)

    @field_validator("artist")
    def validate_artist(cls, value):
        return validate_artist(value)

    @field_validator("link")
    def validate_link(cls, value):
        return validate_link(value)

    @field_validator("sing")
    def validate_sing(cls, value):
        return validate_sing(value)


class UpdateSongParams(BaseModel):
    name: Optional[str] = None
    artist: Optional[str] = None
    link: Optional[str] = None
    sing: Optional[bool] = None

    @field_validator("name")
    def validate_name(cls, value):
        if value:
            return validate_name(value)
        return value

    @field_validator("artist")
    def validate_artist(cls, value):
        if value:
            return validate_artist(value)
        return value

    @field_validator("link")
    def validate_link(cls, value):
        if value:
            return validate_link(value)
        return value

    @field_validator("sing")
    def validate_sing(cls, value):
        if value:
            return validate_sing(value)
        return value


class SongModel:
    def __init__(
        self,
        id: int,
        name: str,
        link: str,
        queue_position: int,
        id_user: str,
        artist: str,
        sing: bool,
    ):
        self.id = id
        self.name = name
        self.link = link
        self.artist = artist
        self.queue_position = queue_position
        self.id_user = id_user
        self.sing = sing

    def __repr__(self) -> str:
        return str(self.to_dto())

    async def to_dto(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "link": self.link,
            "artist": self.artist,
            "user": (await UserDb.find(self.id_user)).to_dto(),
            "queue_position": self.queue_position,
            "sing": self.sing,
        }


class SongDb:
    songs = dict()
    songs_id = 1
    last_id = 1

    @classmethod
    async def create(
        cls, name: str, link: str, id_user: str, artist: str, sing: bool
    ) -> SongModel:
        song = SongModel(
            cls.songs_id, name, link, len(cls.songs) + 1, id_user, artist, sing
        )
        cls.songs[cls.songs_id] = song
        cls.songs_id += 1
        return song

    @classmethod
    async def find(cls, id: int) -> SongModel:
        return cls.songs.get(id, None)

    @classmethod
    async def find_all(cls) -> list[dict]:
        songs = []
        for song in cls.songs.values():
            songs.append(await song.to_dto())
        return songs

    @classmethod
    async def remove(cls, id: int):
        song = await cls.find(id)
        if not song:
            raise HTTPException(detail="Música não encontrada", status_code=404)
        removed_song = cls.songs.pop(id)
        await cls.update_queue(removed_song)
        return removed_song

    @classmethod
    async def update_queue(cls, song: SongModel):
        for item in cls.songs.values():
            if item.queue_position > song.queue_position:
                item.queue_position -= 1
