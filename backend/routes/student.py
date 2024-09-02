from bson import ObjectId
from fastapi import APIRouter
from utilities.database import Database
from utilities.response import JSONResponse

router = APIRouter(tags=["student"], prefix="/student")
db = Database()

@router.get("/details/{student_id}")
async def get_student_details(student_id: str):
    student = db.db.students.find_one({"_id": ObjectId(student_id)})
    student["_id"] = str(student["_id"])
    batch = db.db.batch.find_one({"_id": ObjectId(student["batch"])})
    print(batch)
    teacher = db.db.teachers.find_one({"_id": ObjectId(batch["teacher"])})
    teacher["_id"] = str(teacher["_id"])
    batch["_id"] = str(teacher["_id"])
    student["batch"] = batch
    student["teacher"] = teacher
    return JSONResponse({"data": student, "error": ""})

@router.get("/attendance")
async def attendance(student_id: str):
    result = list(db.db.attendance.find({"student": student_id}))
    for i in range(len(result)):
        result[i]["_id"] = str(result[i]["_id"])
    return JSONResponse({"data": list(result), "error": ""}, 200)