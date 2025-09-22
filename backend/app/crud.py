from sqlalchemy.orm import Session
from . import models, schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_usuario(db: Session, user_in: schemas.UsuarioCreate):
    hashed = get_password_hash(user_in.password)
    usuario = models.Usuario(nombre=user_in.nombre, correo=user_in.correo, hashed_password=hashed)
    db.add(usuario)
    db.commit()
    db.refresh(usuario)
    return usuario

def get_usuario_by_email(db: Session, correo: str):
    return db.query(models.Usuario).filter(models.Usuario.correo == correo).first()

def get_usuario(db: Session, id: int):
    return db.query(models.Usuario).filter(models.Usuario.id == id).first()

def get_usuarios(db: Session):
    return db.query(models.Usuario).all()

def create_mascota(db: Session, mascota_in: schemas.MascotaCreate):
    mascota = models.Mascota(nombre=mascota_in.nombre, raza=mascota_in.raza, edad=mascota_in.edad, usuario_id=mascota_in.usuario_id)
    db.add(mascota)
    db.commit()
    db.refresh(mascota)
    return mascota

def list_mascotas_by_usuario(db: Session, usuario_id: int):
    return db.query(models.Mascota).filter(models.Mascota.usuario_id == usuario_id).all()
