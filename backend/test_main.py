from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_incidents():
    response = client.get("/api/incidents")
    assert response.status_code == 200
    assert response.json() == {"incident": "Track Crack", "confidence": "95%", "severity": "Critical"}

def test_get_obstacles():
    response = client.get("/api/obstacles")
    assert response.status_code == 200
    assert response.json() == {"incident": "Obstacle", "type": "Tree", "distance": "180m"}

def test_get_risk():
    response = client.get("/api/risk")
    assert response.status_code == 200
    assert response.json() == {"score": 92, "priority": "Critical"}
