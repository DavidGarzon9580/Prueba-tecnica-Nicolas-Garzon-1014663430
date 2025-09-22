from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from . import models, schemas, crud, auth
from .database import engine, SessionLocal, Base
from fastapi.middleware.cors import CORSMiddleware

# Crear tablas (si no existen)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Usuarios & Mascotas API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Backend funcionando 🚀"}

@app.get("/usuarios", response_model=list[schemas.UsuarioRead])
def get_usuarios(db: Session = Depends(get_db)):
    return crud.get_usuarios(db)

@app.post("/usuarios", response_model=schemas.UsuarioRead, status_code=201)
def create_usuario(user_in: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    existing = crud.get_usuario_by_email(db, user_in.correo)
    if existing:
        raise HTTPException(status_code=400, detail="Correo ya registrado")
    usuario = crud.create_usuario(db, user_in)
    return usuario

@app.post("/login", response_model=schemas.Token)
def login(login_data: schemas.LoginRequest, db: Session = Depends(get_db)):
    usuario = crud.get_usuario_by_email(db, login_data.correo)
    if not usuario or not crud.verify_password(login_data.password, usuario.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales inválidas")
    token = auth.create_access_token(subject=str(usuario.id))
    return {"access_token": token, "token_type": "bearer"}

@app.post("/mascotas", response_model=schemas.MascotaRead, status_code=201)
def create_mascota(m_in: schemas.MascotaCreate, db: Session = Depends(get_db)):
    usuario = crud.get_usuario(db, m_in.usuario_id)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    mascota = crud.create_mascota(db, m_in)
    return mascota

@app.get("/usuarios/{id}/mascotas", response_model=list[schemas.MascotaRead])
def list_mascotas(id: int, db: Session = Depends(get_db)):
    usuario = crud.get_usuario(db, id)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return crud.list_mascotas_by_usuario(db, id)
