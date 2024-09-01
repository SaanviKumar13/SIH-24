from fastapi import APIRouter
from utilities.response import JSONResponse
from utilities.database import Database
from models.attendance import AttendanceCreate
from models.students import Student
from models.schedule import Schedule
from typing import List
from bson import ObjectId

router = APIRouter()
db = Database()

@router.get("/student/{student_id}")
async def get_student(student_id: str | None):
    if student_id is None:
        result = db.db.students.find_one({"_id": ObjectId(student_id)})
        result["_id"] = str(result["_id"])
        return JSONResponse({"data": result, "error": ""})
    else:
        result = db.db.students.find()
        for i in range(len(result)):
            result[i]["_id"] = str(result[i]["_id"])
        return JSONResponse({"data": list(result), "error": ""})

@router.get("/attendance/{student_id}")
async def get_attendance(student_id: str):
    result = db.db.attendance.find({"student": student_id})    
    for i in range(len(result)):
        result[i]["_id"] = str(result[i]["_id"])    
    return JSONResponse({"data": list(result), "error": ""}, 200)

@router.post("/attendance")
async def add_attendance(attendance: List[AttendanceCreate]):
    result = db.db.attendance.insert_many([attendance[i].dict() for i in range(len(attendance))])
    return JSONResponse({"data": {
        "attendance_ids" : [str(i) for i in result.inserted_ids],
        "message": "attendance added successfully"
    }, "error": ""})

@router.put("/attendance/{attendance_id}")
async def update_attendance(attendance_id: str, attendance: AttendanceCreate):
    db.db.attendance.update_one({"_id": ObjectId(attendance_id)}, {"$set": attendance.dict()})
    return JSONResponse({"data": attendance.dict(), "error": ""})

@router.post("/schedule")
async def add_schedule(schedule: Schedule):
    db.db.schedule.insert_one(schedule.dict())
    return JSONResponse({"data": schedule, "error": ""})

@router.get("/schedule")
async def get_schedule():
    result = db.db.schedule.find()
    for i in range(len(result)):
        result[i]["_id"] = str(result[i]["_id"])
    return JSONResponse({"data": list(result), "error": ""})

