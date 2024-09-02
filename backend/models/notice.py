from pydantic import BaseModel

class Notice(BaseModel):
    heading: str
    content: str
