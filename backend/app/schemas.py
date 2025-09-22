from pydantic import BaseModel, EmailStr, conint

class UsuarioCreate(BaseModel):
    nombre: str
    correo: EmailStr
    password: str

class UsuarioRead(BaseModel):
    id: int
    nombre: str
    correo: EmailStr
    class Config:
        orm_mode = True

class LoginRequest(BaseModel):
    correo: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class MascotaCreate(BaseModel):
    nombre: str
    raza: str
    edad: conint(gt=0)
    usuario_id: int

class MascotaRead(BaseModel):
    id: int
    nombre: str
    raza: str
    edad: int
    usuario_id: int
    class Config:
        orm_mode = True
