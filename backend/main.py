from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import admin, teacher, student
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()
app.include_router(admin.router)
app.include_router(teacher.router)
app.include_router(student.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"Hello": "World"}
