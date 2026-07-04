from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from models import TaskCreate, TaskUpdate, TaskResponse
from database import tasks_collection
from auth import get_current_user
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/api/tasks", tags=["tasks"])

@router.get("", response_model=List[TaskResponse])
async def get_tasks(current_user: dict = Depends(get_current_user)):
    cursor = tasks_collection.find({"user_id": current_user["id"]})
    tasks = await cursor.to_list(length=100)
    
    return [
        TaskResponse(
            id=str(task["_id"]),
            title=task["title"],
            description=task.get("description"),
            completed=task.get("completed", False),
            user_id=task["user_id"],
            created_at=task.get("created_at"),
            updated_at=task.get("updated_at")
        ) for task in tasks
    ]

@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(task: TaskCreate, current_user: dict = Depends(get_current_user)):
    now = datetime.utcnow()
    new_task = {
        "title": task.title,
        "description": task.description,
        "completed": task.completed,
        "user_id": current_user["id"],
        "created_at": now,
        "updated_at": now
    }
    
    result = await tasks_collection.insert_one(new_task)
    
    return TaskResponse(
        id=str(result.inserted_id),
        **new_task
    )

@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(task_id: str, task_update: TaskUpdate, current_user: dict = Depends(get_current_user)):
    try:
        obj_id = ObjectId(task_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid task ID format")
        
    existing_task = await tasks_collection.find_one({"_id": obj_id, "user_id": current_user["id"]})
    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    update_data = {k: v for k, v in task_update.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await tasks_collection.update_one(
        {"_id": obj_id},
        {"$set": update_data}
    )
    
    updated_task = await tasks_collection.find_one({"_id": obj_id})
    return TaskResponse(
        id=str(updated_task["_id"]),
        title=updated_task["title"],
        description=updated_task.get("description"),
        completed=updated_task.get("completed", False),
        user_id=updated_task["user_id"],
        created_at=updated_task.get("created_at"),
        updated_at=updated_task.get("updated_at")
    )

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(task_id: str, current_user: dict = Depends(get_current_user)):
    try:
        obj_id = ObjectId(task_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid task ID format")
        
    result = await tasks_collection.delete_one({"_id": obj_id, "user_id": current_user["id"]})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return None
