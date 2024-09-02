from pydantic import BaseModel


class Schedule(BaseModel):
    time: str
    day: str
    batch: str
    subject: str
    type: str
    location: str
