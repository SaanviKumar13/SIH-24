from pydantic import BaseModel


class Teacher(BaseModel):
    name: str
    email: str
    phone: str
