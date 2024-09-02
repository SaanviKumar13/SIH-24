from fastapi import APIRouter
from utilities.database import Database
from utilities.response import JSONResponse
from bson import ObjectId
from models.notice import Notice

router = APIRouter(tags=["notice"], prefix="/notice")
db = Database()

@router.get("/")
async def get_notice(): 
    result = list(db.db.notice.find())
    for i in range(len(result)):
        result[i]["_id"] = str(result[i]["_id"])
    return JSONResponse({
        "data": result,
        "error": ""
    })

@router.post("/")
async def add_notice(notice: Notice):
    result = db.db.notice.insert_one(dict(notice))
    return JSONResponse({
        "data": {
            "message": "Successfully added notice",
            "inserted_id": str(result.inserted_id)
        },
        "error": ""
    })

@router.delete("/{notice_id}")
async def delete_notice(notice_id: str):
    db.db.notice.delete_one({"_id": ObjectId(notice_id)})
    return JSONResponse({"data": "Successfully deleted the notice", "error": ""})
