from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

client = AsyncIOMotorClient(settings.mongo_uri)
db = client.task_manager

# Collections
users_collection = db.get_collection("users")
tasks_collection = db.get_collection("tasks")
