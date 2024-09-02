from pydantic import BaseModel


class Student(BaseModel):
    name: str
    email: str
    phone: str
    address: str
    batch: str  # batch basically means class only, nothing else
