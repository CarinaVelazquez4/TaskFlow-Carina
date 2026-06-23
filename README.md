# 🚀 TaskFlow - Sistema de Gestión de Tareas

**Estudiante:** Carina Velazquez

---

## 📋 Descripción del Proyecto

TaskFlow es una aplicación web diseñada para la gestión y organización de tareas personales. Permite a los usuarios crear, administrar y dar seguimiento a sus actividades mediante una interfaz moderna e intuitiva.

El sistema está desarrollado utilizando:

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Base de Datos:** PostgreSQL
- **Autenticación:** JWT (JSON Web Token)

---

# ✨ Funcionalidades Principales

## 👤 Gestión de Usuarios

- Registro de usuarios.
- Inicio de sesión seguro.
- Autenticación mediante JWT.
- Protección de rutas privadas.

## ✅ Gestión de Tareas

- Crear tareas.
- Editar tareas existentes.
- Eliminar tareas.
- Consultar listado de tareas.
- Marcar tareas como completadas.

## 📂 Gestión de Categorías

Se implementó un módulo de **Categorías de Tareas** que permite a cada usuario organizar sus tareas mediante categorías personalizadas.

Cada categoría contiene:

- Nombre
- Descripción
- Color identificador

La funcionalidad incluye:

- CRUD completo
- Validaciones en backend
- Protección mediante JWT
- Integración visual en el frontend

---

# 🗄️ Estructura de la Base de Datos

## Tabla Categories

```sql
CREATE TABLE IF NOT EXISTS categories (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL,
    description TEXT,
    color       VARCHAR(7) DEFAULT '#6366f1',
    user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at  TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

# 🔗 API REST - Categorías

Todos los endpoints requieren autenticación mediante:

```http
Authorization: Bearer <token>
```

| Método | Endpoint | Descripción |
|----------|----------|-------------|
| GET | /api/categorias | Obtener todas las categorías |
| GET | /api/categorias/:id | Obtener categoría por ID |
| POST | /api/categorias | Crear categoría |
| PUT | /api/categorias/:id | Actualizar categoría |
| DELETE | /api/categorias/:id | Eliminar categoría |

---

# 📁 Estructura del Proyecto

```text
TaskFlow-Carina/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── app.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── components/
│   │   └── App.jsx
│   └── package.json
│
└── package.json
```

---

# 📄 Archivos Agregados para Categorías

## Backend

- `src/controllers/categoryController.js`
- `src/routes/categoryRoutes.js`

## Frontend

- `src/services/categoryService.js`
- `src/pages/CategoriesPage.jsx`

## Archivos Modificados

### Backend

- `src/app.js`

### Frontend

- `src/App.jsx`

---

# ⚙️ Requisitos Previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- Node.js 18 o superior
- PostgreSQL
- Git

---

# 🔧 Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/CarinaVelazquez4/TaskFlow-Carina.git
```

```bash
cd TaskFlow-Carina
```

## 2. Instalar dependencias

```bash
npm run install-all
```

O manualmente:

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

# 🗃️ Configuración de Variables de Entorno

Crear un archivo `.env` dentro de la carpeta `backend`.

Ejemplo:

```env
PORT=4000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=taskflow

JWT_SECRET=tu_clave_secreta
```

---

# ▶️ Ejecución del Proyecto

## Ejecutar Backend y Frontend simultáneamente

```bash
npm run dev
```

Este comando utiliza **concurrently** para iniciar ambos servicios:

- **[BACKEND]** → API REST (Puerto 4000)
- **[FRONTEND]** → Cliente React/Vite (Puerto 5173)

---

# 🌐 Acceso al Sistema

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:4000
```

---

# 🛠️ Tecnologías Utilizadas

### Frontend

- React
- React Router DOM
- Axios
- Vite

### Backend

- Node.js
- Express.js
- JWT
- bcrypt
- CORS

### Base de Datos

- PostgreSQL

---

# 🎯 Objetivo del Proyecto

Desarrollar una aplicación web moderna para la administración de tareas personales, permitiendo a los usuarios organizar sus actividades mediante categorías personalizadas, mejorando la productividad y la gestión eficiente del tiempo.

---

# 👨‍💻 Autor

**Carina Velazquez**

