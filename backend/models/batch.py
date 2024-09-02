from pydantic import BaseModel


class Batch(BaseModel):
    name: str
    teacher: str
