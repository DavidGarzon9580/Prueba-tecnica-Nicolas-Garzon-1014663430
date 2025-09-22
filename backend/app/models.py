from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    correo = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    mascotas = relationship("Mascota", back_populates="owner")

class Mascota(Base):
    __tablename__ = "mascotas"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    raza = Column(String)
    edad = Column(Integer)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    owner = relationship("Usuario", back_populates="mascotas")
