from fastapi import APIRouter, File, UploadFile

from utilities.response import JSONResponse
from utilities.database import Database
from utilities.object_loading import upload_file, get_file, delete_file, list_files

from models.attendance import AttendanceCreate
from models.students import Student
from models.schedule import Schedule

from typing import List, Annotated
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

@router.put("/schedule/{schedule_id}")
async def update_schedule(schedule_id: str, schedule: Schedule):
    db.db.schedule.update_one({"_id": ObjectId(schedule_id)}, {"$set": schedule.dict()})
    return JSONResponse({"data": schedule.dict(), "error": ""})

@router.post("/ar")
async def upload(glb: UploadFile = File(...), usdz_file: UploadFile = File(...)):
    return JSONResponse({"data": "File uploaded successfully", "error": ""})

@router.delete("/ar/{file_name}")
async def delete(file_name: str):
    delete_file(file_name)
    return JSONResponse({"data": "File deleted successfully", "error": ""})

@router.post("/take_attendance")
async def take_attendance(photo: UploadFile = File(...)):
    # here is your function to take attendance
    # Input: photo
    # Output: list of student ids
    student_ids = [] # list of student ids
    
    return JSONResponse({"data": student_ids, "error": ""})