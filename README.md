# API REST Colegio – SENA

## Descripción
API REST desarrollada con Node.js y Express.js para el sistema de gestión de un colegio. Implementa CRUD completo para 4 recursos: Estudiantes, Profesores, Materias y Notas.

## Tecnologías
- Node.js v18+
- Express.js

## Instalación
```bash
npm install
node index.js
```

## Endpoints

### Estudiantes
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /estudiantes | Lista todos los estudiantes |
| GET | /estudiantes/:id | Busca un estudiante por ID |
| POST | /estudiantes | Crea un nuevo estudiante |
| PUT | /estudiantes/:id | Actualiza un estudiante |
| DELETE | /estudiantes/:id | Elimina un estudiante |

### Profesores
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /profesores | Lista todos los profesores |
| GET | /profesores/:id | Busca un profesor por ID |
| POST | /profesores | Crea un nuevo profesor |
| PUT | /profesores/:id | Actualiza un profesor |
| DELETE | /profesores/:id | Elimina un profesor |

### Materias
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /materias | Lista todas las materias |
| GET | /materias/:id | Busca una materia por ID |
| POST | /materias | Crea una nueva materia |
| PUT | /materias/:id | Actualiza una materia |
| DELETE | /materias/:id | Elimina una materia |

### Notas
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /notas | Lista todas las notas |
| GET | /notas/:id | Busca una nota por ID |
| POST | /notas | Crea una nueva nota |
| PUT | /notas/:id | Actualiza una nota |
| DELETE | /notas/:id | Elimina una nota |

## Ejemplos de uso

### Query Params
```
GET /estudiantes?grado=10
GET /estudiantes?nombre=Juan
GET /profesores?materia=Matematicas
```

### Headers
```
Authorization: mi-token-secreto
```

### Campos por recurso

**Estudiantes**
```json
{
    "nombre": "Juan Pérez",
    "email": "juan@gmail.com",
    "grado": "10",
    "activo": true
}
```

**Profesores**
```json
{
    "nombre": "Carlos Ramírez",
    "email": "carlos@colegio.com",
    "materia": "Matemáticas",
    "activo": true
}
```

**Materias**
```json
{
    "nombre": "Matemáticas",
    "descripcion": "Álgebra y geometría",
    "activa": true
}
```

**Notas**
```json
{
    "estudianteId": 1,
    "materiaId": 1,
    "nota": 4.5,
    "periodo": "1",
    "fecha": "2024-01-15"
}
```

## Códigos de respuesta
- 200 OK – consultas y actualizaciones exitosas
- 201 Created – recurso creado correctamente
- 404 Not Found – recurso no encontrado
- 400 Bad Request – datos incompletos o inválidos

## Integrantes
- Andres Felipe Alvarez Restrepo
- Sebastian Monsalve Ramos

## Instructor
Mateo | Tecnología en Análisis y Desarrollo de Software – SENA

