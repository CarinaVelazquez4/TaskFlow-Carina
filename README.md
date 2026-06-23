# TaskFlow - Gestión de Tareas

**Estudiante:** Carina Velazquez

---

## Descripción de la Funcionalidad Implementada

Se implementó un módulo de **Categorías de Tareas** que permite a cada usuario organizar sus tareas mediante categorías personalizadas. Cada categoría cuenta con un nombre, descripción y un color identificador.

La funcionalidad incluye un CRUD completo con autenticación mediante tokens JWT, validaciones en el backend y una interfaz visual integrada en el frontend.

---

## Estructura de la Nueva Tabla

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

## Endpoints Creados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/categorias` | Obtener todas las categorías del usuario |
| GET | `/api/categorias/:id` | Obtener una categoría por ID |
| POST | `/api/categorias` | Crear una nueva categoría |
| PUT | `/api/categorias/:id` | Actualizar una categoría existente |
| DELETE | `/api/categorias/:id` | Eliminar una categoría |

Todos los endpoints requieren autenticación mediante token JWT en el header `Authorization: Bearer <token>`.

---

## Archivos Nuevos Agregados

### Backend
- `src/controllers/categoryController.js` — Lógica del CRUD de categorías
- `src/routes/categoryRoutes.js` — Rutas protegidas de categorías

### Frontend
- `src/services/categoryService.js` — Servicio de conexión con la API
- `src/pages/CategoriesPage.jsx` — Página de gestión de categorías

### Archivos Modificados
- `src/app.js` — Registro de las rutas de categorías
- `src/App.jsx` — Nueva ruta `/categorias`

# TaskFlow System

Este proyecto utiliza una arquitectura de microservicios con un Backend (Node.js/Express) y un Frontend (React/Vite).

## Requisitos Previos

- Node.js instalado
- Base de Datos PostgreSQL configurada (ver `backend/.env`)

## Inicio Rápido

Para levantar ambos servicios (Backend y Frontend) simultáneamente con un solo comando:

```bash
npm run dev
```

Este comando utiliza `concurrently` para gestionar ambos procesos en una sola terminal, etiquetando los logs para facilitar la depuración:
- **[BACKEND]**: Logs del servidor API (Puerto 4000)
- **[FRONTEND]**: Logs del cliente Vite (Puerto 5173)

## Instalación

Si es la primera vez que clonas el proyecto, puedes instalar todas las dependencias con:

```bash
npm run install-all
```

## Estructura del Proyecto

- `/backend`: API REST y conexión a base de datos.
- `/frontend`: Interfaz de usuario Cyberpunk.
