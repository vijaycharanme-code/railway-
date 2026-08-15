from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="RailGuard AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/incidents")
def get_incidents():
    return {"incident": "Track Crack", "confidence": "95%", "severity": "Critical"}

@app.get("/api/obstacles")
def get_obstacles():
    return {"incident": "Obstacle", "type": "Tree", "distance": "180m"}

@app.get("/api/risk")
def get_risk():
    return {"score": 92, "priority": "Critical"}

import httpx

@app.post("/api/generate_report")
async def generate_report():
    # Scaffold for Ollama integration
    # In a real environment, you'd post specific prompts to Ollama
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://ollama:11434/api/generate",
                json={
                    "model": "llama3",
                    "prompt": "Generate a short railway incident report for a track crack.",
                    "stream": False
                },
                timeout=10.0
            )
            return response.json()
    except httpx.RequestError as exc:
        # Fallback to mock data if Ollama container isn't running or model isn't pulled
        return {"response": "Mock Report: Critical track crack detected at mile 42. Maintenance crew dispatched.", "status": "mocked"}
