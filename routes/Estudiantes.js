const express = require('express');
const router = express.Router();

let estudiantes = [
  { id: 1, nombre: "Juan Pérez", email: "juan@gmail.com", grado: "10", activo: true },
  { id: 2, nombre: "Maria García", email: "maria@gmail.com", grado: "11", activo: true },
  { id: 3, nombre: "Carlos López", email: "carlos@gmail.com", grado: "9", activo: true }
];

let nextId = 4;

// GET - Lista todos los estudiantes (con filtros opcionales)
router.get('/', (req, res) => {
  const token = req.headers['authorization'];
  const filtros = req.query;

  let data = estudiantes.filter(e =>
    Object.entries(filtros).every(([k, v]) =>
      e[k]?.toString().toLowerCase().includes(v.toLowerCase())
    )
  );

  res.json({ success: true, headers: { token }, total: data.length, data });
});

// GET - Busca un estudiante por ID
router.get('/:id', (req, res) => {
  const estudiante = estudiantes.find(e => e.id === parseInt(req.params.id));
  if (!estudiante) return res.status(404).json({ success: false, message: 'Estudiante no encontrado' });
  res.json({ success: true, data: estudiante });
});

// POST - Crea un nuevo estudiante
router.post('/', (req, res) => {
  const { nombre, email, grado, activo } = req.body;
  if (!nombre || !email || !grado) {
    return res.status(400).json({ success: false, message: 'Faltan datos obligatorios' });
  }
  const nuevo = { id: nextId++, nombre, email, grado, activo: activo ?? true };
  estudiantes.push(nuevo);
  res.status(201).json({ success: true, data: nuevo });
});

// PUT - Actualiza un estudiante
router.put('/:id', (req, res) => {
  const index = estudiantes.findIndex(e => e.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Estudiante no encontrado' });
  estudiantes[index] = { ...estudiantes[index], ...req.body };
  res.json({ success: true, data: estudiantes[index] });
});

//


// DELETE - Elimina un estudiante
router.delete('/:id', (req, res) => {
  const index = estudiantes.findIndex(e => e.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Estudiante no encontrado' });
  const eliminado = estudiantes.splice(index, 1);
  res.json({ success: true, message: 'Estudiante eliminado', data: eliminado });
});

module.exports = router;

