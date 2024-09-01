from pydantic import BaseModel

class Schedule(BaseModel):
    date: str
    batch: str
    topic: str