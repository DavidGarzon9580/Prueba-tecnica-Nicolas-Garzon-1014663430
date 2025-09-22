# Sistema de Gestión de Usuarios y Mascotas

## Información del Desarrollador

**Nombre:** Nicolas David Garzón Avendaño  
**Email:** ngarzonavendano@gmail.com  
**Tiempo de desarrollo:** 7-8 horas

## Descripción del Proyecto

Sistema web full-stack desarrollado para la gestión de usuarios y sus mascotas. La aplicación permite registrar usuarios, asociar mascotas a usuarios existentes y consultar la información registrada.

## Arquitectura Técnica

### Backend (FastAPI)
- **Framework:** FastAPI 0.104.1
- **Lenguaje:** Python 3.13.7
- **Base de datos:** SQLite con SQLAlchemy ORM
- **Autenticación:** JWT (JSON Web Tokens)
- **Seguridad:** bcrypt para hash de contraseñas
- **CORS:** Configurado para comunicación con frontend

### Frontend (Angular)
- **Framework:** Angular 20
- **Lenguaje:** TypeScript
- **UI Components:** Angular Material
- **HTTP Client:** HttpClient para comunicación con API
- **Routing:** Angular Router para navegación
- **Forms:** Reactive Forms para validación

### Base de Datos
- **Motor:** SQLite
- **ORM:** SQLAlchemy
- **Modelos:** Usuario y Mascota con relación uno a muchos

## Estructura del Proyecto

```
Prueba-tecnica-Nicolas-Garzon-1014663430/
├── backend/
│   ├── main.py                 # Punto de entrada de la API
│   ├── models.py              # Modelos de base de datos
│   ├── database.py            # Configuración de base de datos
│   ├── auth.py                # Lógica de autenticación
│   └── requirements.txt       # Dependencias Python
├── frontend/
│   └── frontend-app/
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/    # Componentes Angular
│       │   │   ├── services/      # Servicios de API
│       │   │   └── app.routes.ts  # Configuración de rutas
│       │   └── main.ts           # Punto de entrada Angular
│       ├── angular.json         # Configuración Angular
│       └── package.json         # Dependencias Node.js
└── docker-compose.yml          # Configuración Docker
```

## Funcionalidades Implementadas

### Gestión de Usuarios
- Registro de nuevos usuarios con validación
- Autenticación mediante JWT
- Validación de email único
- Hash seguro de contraseñas

### Gestión de Mascotas
- Registro de mascotas asociadas a usuarios
- Consulta de mascotas por usuario
- Validación de datos de mascotas
- Relación uno a muchos (Usuario-Mascota)

### API REST
- **POST /register** - Registro de usuarios
- **POST /login** - Autenticación de usuarios
- **GET /users** - Lista de usuarios (protegida)
- **POST /pets** - Registro de mascotas (protegida)
- **GET /pets/{user_id}** - Mascotas por usuario (protegida)

## Instalación y Ejecución

### Prerrequisitos
- Python 3.13.7
- Node.js v22.17.0
- Docker (opcional)

### Instalación con Docker (Recomendado)

1. **Clonar el repositorio:**
```bash
git clone <repository-url>
cd Prueba-tecnica-Nicolas-Garzon-1014663430
```

2. **Ejecutar con Docker Compose:**
```bash
docker-compose up --build
```

3. **Acceder a la aplicación:**
- Frontend: http://localhost:4200
- Backend API: http://localhost:8000
- Documentación API: http://localhost:8000/docs

### Instalación Manual

#### Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend
```bash
cd frontend/frontend-app
npm install
ng serve --host 0.0.0.0 --port 4200
```

## Configuración de Base de Datos

La aplicación utiliza SQLite como base de datos por defecto. La base de datos se crea automáticamente al ejecutar la aplicación por primera vez.

### Modelos de Datos

**Usuario:**
- id (Primary Key)
- nombre (String, requerido)
- correo (String, único, requerido)
- password_hash (String, requerido)
- created_at (DateTime)

**Mascota:**
- id (Primary Key)
- nombre (String, requerido)
- raza (String, requerido)
- edad (Integer, requerido)
- usuario_id (Foreign Key)
- created_at (DateTime)

## Seguridad

- **Autenticación JWT:** Tokens seguros con expiración
- **Hash de contraseñas:** bcrypt con salt automático
- **CORS:** Configurado para permitir comunicación frontend-backend
- **Validación:** Validación de datos en frontend y backend
- **Protección de rutas:** Rutas protegidas requieren autenticación

## Testing

### Backend
```bash
cd backend
python -m pytest
```

### Frontend
```bash
cd frontend/frontend-app
ng test
```

## API Documentation

La documentación interactiva de la API está disponible en:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## Despliegue

### Docker
```bash
docker-compose up -d
```

### Producción
1. Configurar variables de entorno
2. Configurar base de datos de producción
3. Ejecutar migraciones
4. Desplegar frontend y backend

## Tecnologías Utilizadas

### Backend
- FastAPI 0.104.1
- SQLAlchemy 2.0.23
- Pydantic 2.5.0
- Python-JOSE 3.3.0
- bcrypt 4.1.2
- python-multipart 0.0.6

### Frontend
- Angular 20
- Angular Material
- TypeScript 5.2.3
- RxJS 7.8.1

### Herramientas
- Docker
- Docker Compose
- Git

## Estructura de Archivos Principales

### Backend
- `main.py` - Configuración principal de FastAPI
- `models.py` - Modelos de base de datos
- `database.py` - Configuración de SQLAlchemy
- `auth.py` - Lógica de autenticación JWT

### Frontend
- `app.routes.ts` - Configuración de rutas
- `api.service.ts` - Servicio para comunicación con API
- `login/` - Componente de autenticación
- `register-user/` - Componente de registro de usuarios
- `register-pet/` - Componente de registro de mascotas
- `list-pets/` - Componente de consulta de mascotas
- `dashboard/` - Componente principal

## Consideraciones Técnicas

- **Arquitectura:** Separación clara entre frontend y backend
- **Comunicación:** API REST con JSON
- **Estado:** Gestión de estado local en frontend
- **Validación:** Validación en cliente y servidor
- **Error Handling:** Manejo de errores en todas las capas
- **Logging:** Sistema de logs para debugging

## Variables de Entorno

### Backend
```env
SECRET_KEY=tu_clave_secreta_aqui
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend
```env
API_URL=http://localhost:8000
```

## Solución de Problemas

### Error de CORS
Si encuentras errores de CORS, verifica que el backend esté ejecutándose en el puerto 8000 y el frontend en el puerto 4200.

### Error de Base de Datos
Si la base de datos no se crea automáticamente, ejecuta:
```bash
cd backend
python -c "from database import engine; from models import Base; Base.metadata.create_all(bind=engine)"
```

### Error de Dependencias
Si hay problemas con las dependencias, ejecuta:
```bash
# Backend
cd backend
pip install --upgrade pip
pip install -r requirements.txt

# Frontend
cd frontend/frontend-app
npm install --force
```

## Flujo de la Aplicación

1. **Acceso inicial:** El usuario accede a la aplicación y es redirigido al login
2. **Registro:** Si no tiene cuenta, puede registrarse con nombre, email y contraseña
3. **Autenticación:** El usuario se autentica con email y contraseña
4. **Dashboard:** Una vez autenticado, accede al panel principal
5. **Gestión de usuarios:** Puede registrar nuevos usuarios desde el dashboard
6. **Gestión de mascotas:** Puede registrar mascotas asociadas a usuarios existentes
7. **Consulta:** Puede consultar las mascotas registradas por usuario
8. **Cierre de sesión:** Puede cerrar sesión en cualquier momento

## Endpoints de la API

### Autenticación
- `POST /register` - Registro de usuario
- `POST /login` - Inicio de sesión

### Usuarios
- `GET /users` - Obtener lista de usuarios (requiere autenticación)

### Mascotas
- `POST /pets` - Registrar nueva mascota (requiere autenticación)
- `GET /pets/{user_id}` - Obtener mascotas de un usuario (requiere autenticación)

## Estructura de Respuestas de la API

### Respuesta Exitosa
```json
{
  "message": "Operación exitosa",
  "data": { ... }
}
```

### Respuesta de Error
```json
{
  "detail": "Mensaje de error específico"
}
```

### Respuesta de Autenticación
```json
{
  "access_token": "jwt_token_aqui",
  "token_type": "bearer"
}
```

## Métricas del Proyecto

- **Líneas de código:** ~2,500 líneas
- **Archivos:** 25+ archivos
- **Componentes Angular:** 5 componentes principales
- **Endpoints API:** 5 endpoints REST
- **Modelos de datos:** 2 modelos (Usuario, Mascota)
- **Tiempo de desarrollo:** 7-8 horas

## Capturas de Pantalla

### Pantalla de Login
- Formulario de autenticación con validación
- Enlace para registro de nuevos usuarios

### Dashboard Principal
- Panel de control con opciones de navegación
- Acceso a todas las funcionalidades del sistema

### Registro de Usuarios
- Formulario de registro con validación completa
- Campos: nombre, email, contraseña

### Registro de Mascotas
- Formulario para asociar mascotas a usuarios
- Campos: nombre, raza, edad, usuario

### Lista de Mascotas
- Consulta de mascotas por usuario
- Información detallada de cada mascota

## Mejoras Futuras

- Implementar paginación en listados
- Agregar filtros de búsqueda avanzados
- Implementar roles de usuario
- Agregar validación de email por envío
- Implementar recuperación de contraseña
- Agregar logs de auditoría
- Implementar cache para mejor rendimiento

## Contacto

Para consultas sobre este proyecto, contactar a:
- **Email:** ngarzonavendano@gmail.com
- **Desarrollador:** Nicolas David Garzón Avendaño

## Licencia

Este proyecto fue desarrollado como parte de una prueba técnica.

---

**Nota:** Este README proporciona toda la información necesaria para entender, instalar y ejecutar el proyecto. Para cualquier duda técnica, consultar la documentación de la API en http://localhost:8000/docs una vez que el servidor esté ejecutándose.