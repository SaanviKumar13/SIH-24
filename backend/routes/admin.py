from fastapi import APIRouter
from models.teacher import Teacher
from utilities.database import Database
from utilities.response import JSONResponse
from models.students import Student
from models.batch import Batch
from bson import ObjectId

router = APIRouter(tags=["admin"])
db = Database()


@router.get("/batches")
async def get_batches():
    result = list(db.db.batch.find())
    for i in range(len(result)):
        result[i]["_id"] = str(result[i]["_id"])
    return JSONResponse({"data": list(result), "error": ""})


@router.post("/batch")
async def create_batch(batch: Batch):
    result = db.db.batch.insert_one(batch.dict())
    return JSONResponse({"data": {"inserted_id": str(result.inserted_id)}, "error": ""})


@router.put("/batch/{batch_id}")
async def update_batch(batch_id: str, batch: Batch):
    db.db.batch.update_one({"_id": ObjectId(batch_id)}, {"$set": batch.dict()})
    return JSONResponse({"data": batch.dict(), "error": ""})


@router.delete("/batch/{batch_id}")
async def delete_batch(batch_id: str):
    db.db.batch.delete_one({"_id": ObjectId(batch_id)})
    return JSONResponse({"data": "Successfully deleted batch", "error": ""})


@router.post("/teacher")
async def create_teacher(teacher: Teacher):
    db.db.teachers.insert_one(teacher.dict())
    return JSONResponse({"data": teacher.dict(), "error": ""})


@router.get("/teacher/{teacher_id}")
async def get_teacher(teacher_id: str):
    result = db.db.teachers.find_one({"_id": ObjectId(teacher_id)})
    result["_id"] = str(result["_id"])
    return JSONResponse({"data": result, "error": ""})


@router.get("/teachers")
async def get_teachers():
    result = list(db.db.teachers.find())
    for i in range(len(result)):
        result[i]["_id"] = str(result[i]["_id"])
    return JSONResponse({"data": list(result), "error": ""})


@router.put("/teacher/{teacher_id}")
async def update_teacher(teacher_id: str, teacher: Teacher):
    db.db.teachers.update_one({"_id": ObjectId(teacher_id)}, {"$set": teacher.dict()})
    return JSONResponse({"data": teacher.dict(), "error": ""})


@router.delete("/teacher/{teacher_id}")
async def delete_teacher(teacher_id: str):
    db.db.teachers.delete_one({"_id": ObjectId(teacher_id)})
    return JSONResponse({"data": "Successfully deleted teacher", "error": ""})
