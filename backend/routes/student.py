from fastapi import APIRouter
from utilities.database import Database

router = APIRouter(tags=["student"])
db = Database()
