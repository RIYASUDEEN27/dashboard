from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, tasks

app = FastAPI(title="Task Manager API")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(tasks.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Task Manager API"}
