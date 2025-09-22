import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import SessionLocal, engine
from app import models

# Create test database
models.Base.metadata.create_all(bind=engine)

client = TestClient(app)

def test_root():
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Backend funcionando 🚀"}

def test_create_usuario():
    """Test user creation"""
    user_data = {
        "nombre": "Test User",
        "correo": "test@example.com",
        "password": "testpassword123"
    }
    response = client.post("/usuarios", json=user_data)
    assert response.status_code == 201
    data = response.json()
    assert data["nombre"] == user_data["nombre"]
    assert data["correo"] == user_data["correo"]
    assert "id" in data

def test_create_usuario_duplicate_email():
    """Test user creation with duplicate email"""
    user_data = {
        "nombre": "Test User 2",
        "correo": "test@example.com",
        "password": "testpassword123"
    }
    # First user
    client.post("/usuarios", json=user_data)
    # Second user with same email
    response = client.post("/usuarios", json=user_data)
    assert response.status_code == 400
    assert "Correo ya registrado" in response.json()["detail"]

def test_get_usuarios():
    """Test get users endpoint"""
    response = client.get("/usuarios")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_mascota():
    """Test pet creation"""
    # First create a user
    user_data = {
        "nombre": "Pet Owner",
        "correo": "owner@example.com",
        "password": "testpassword123"
    }
    user_response = client.post("/usuarios", json=user_data)
    user_id = user_response.json()["id"]
    
    # Create pet
    pet_data = {
        "nombre": "Buddy",
        "raza": "Golden Retriever",
        "edad": 3,
        "usuario_id": user_id
    }
    response = client.post("/mascotas", json=pet_data)
    assert response.status_code == 201
    data = response.json()
    assert data["nombre"] == pet_data["nombre"]
    assert data["raza"] == pet_data["raza"]
    assert data["edad"] == pet_data["edad"]
    assert data["usuario_id"] == user_id

def test_get_mascotas_by_usuario():
    """Test get pets by user"""
    # Create user and pet first
    user_data = {
        "nombre": "Pet Owner 2",
        "correo": "owner2@example.com",
        "password": "testpassword123"
    }
    user_response = client.post("/usuarios", json=user_data)
    user_id = user_response.json()["id"]
    
    pet_data = {
        "nombre": "Max",
        "raza": "Labrador",
        "edad": 2,
        "usuario_id": user_id
    }
    client.post("/mascotas", json=pet_data)
    
    # Get pets by user
    response = client.get(f"/usuarios/{user_id}/mascotas")
    assert response.status_code == 200
    pets = response.json()
    assert isinstance(pets, list)
    assert len(pets) == 1
    assert pets[0]["nombre"] == "Max"

def test_login():
    """Test login endpoint"""
    # Create user first
    user_data = {
        "nombre": "Login User",
        "correo": "login@example.com",
        "password": "testpassword123"
    }
    client.post("/usuarios", json=user_data)
    
    # Test login
    login_data = {
        "correo": "login@example.com",
        "password": "testpassword123"
    }
    response = client.post("/login", json=login_data)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_invalid_credentials():
    """Test login with invalid credentials"""
    login_data = {
        "correo": "nonexistent@example.com",
        "password": "wrongpassword"
    }
    response = client.post("/login", json=login_data)
    assert response.status_code == 401
    assert "Credenciales inválidas" in response.json()["detail"]
