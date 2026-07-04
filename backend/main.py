from config import settings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, tasks

app = FastAPI(title="Task Manager API")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(tasks.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Task Manager API"}
