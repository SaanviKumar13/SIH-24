from pydantic import BaseModel


class AttendanceCreate(BaseModel):
    student: str
    time: str
    status: str
    date: str
