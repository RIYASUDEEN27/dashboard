import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

async def main():
    print("Checking connection to MongoDB Atlas...")
    print(f"Connection URI configured in settings: {settings.mongo_uri.split('@')[-1] if '@' in settings.mongo_uri else settings.mongo_uri} (credentials hidden)")
    
    try:
        # Initialize client with configured URI
        client = AsyncIOMotorClient(settings.mongo_uri)
        
        # The ping command is cheap and does not require provider-specific authority
        print("Sending ping...")
        response = await client.admin.command('ping')
        
        print("\n=========================================")
        print("[SUCCESS]: Successfully connected to MongoDB Atlas!")
        print("Response from server:", response)
        print("=========================================")
        
    except Exception as e:
        print("\n=========================================")
        print("[CONNECTION FAILED]")
        print(f"Error details: {e}")
        print("=========================================")
        print("\nPossible solutions:")
        print("1. Check your password in backend/.env (remember special characters like @, /, (, ) must be percent-encoded).")
        print("2. Ensure the IP address of your machine is added to the MongoDB Atlas IP Access List (Network Security).")
        print("3. Ensure your MongoDB Atlas user has readWrite permissions to the database.")

if __name__ == "__main__":
    asyncio.run(main())
