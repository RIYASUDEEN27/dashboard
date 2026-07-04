# Task Manager Application

A modern, full-stack Task Manager built with a FastAPI (Python) backend and React (Vite) frontend, using MongoDB for data storage.

## Features
- **User Authentication**: Register and login with JWT.
- **Task Management**: Create, read, update, and delete tasks. Mark them as completed.
- **Premium UI**: Built with Tailwind CSS, Framer Motion, and Glassmorphism effects for a sleek, modern look.
- **Responsive Design**: Works on desktop and mobile.

## Prerequisites
- **Python 3.8+**
- **Node.js 18+**
- **MongoDB**: A running instance (local or Atlas) on `mongodb://localhost:27017` (default) or set via `.env` file.

## Setup Instructions

### 1. Backend (FastAPI + MongoDB)
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows
   .\venv\Scripts\activate
   # On Mac/Linux
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment:
   Ensure MongoDB is running. The default connection uses `mongodb://localhost:27017`.
   You can change settings in `backend/.env`.
5. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```
   The API will be running at `http://localhost:8000`. You can access the auto-generated Swagger UI at `http://localhost:8000/docs`.

### 2. Frontend (React + Vite)
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the application in your browser at `http://localhost:5173`.

## Architecture Highlights
- **Backend**: FastAPI offers excellent async performance and auto-documentation. `motor` is used for non-blocking MongoDB interactions.
- **Frontend**: Vite provides a blazingly fast development experience. Tailwind CSS handles styling, while `framer-motion` adds smooth page transitions and micro-animations to enhance user experience. Axios handles API requests, with an interceptor to inject the JWT token automatically.
