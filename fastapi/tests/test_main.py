from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/api/forecast?dish_id=1")
    assert response.status_code == 200
    assert "predictions" in response.json()
