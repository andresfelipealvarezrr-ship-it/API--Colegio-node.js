const express = require('express');
const router = express.Router();

let profesores = [
  { id: 1, nombre: "Carlos Ramírez", email: "carlos@colegio.com", materia: "Matemáticas", activo: true },
  { id: 2, nombre: "Ana Martínez", email: "ana@colegio.com", materia: "Español", activo: true },
  { id: 3, nombre: "Luis Herrera", email: "luis@colegio.com", materia: "Ciencias", activo: true }
];

let nextId = 4;

// GET - Lista todos los profesores (con filtros opcionales)
router.get('/', (req, res) => {
  const token = req.headers['authorization'];
  const filtros = req.query;

  let data = profesores.filter(p =>
    Object.entries(filtros).every(([k, v]) =>
      p[k]?.toString().toLowerCase().includes(v.toLowerCase())
    )
  );

  res.json({ success: true, headers: { token }, total: data.length, data });
});

// GET - Busca un profesor por ID
router.get('/:id', (req, res) => {
  const profesor = profesores.find(p => p.id === parseInt(req.params.id));
  if (!profesor) return res.status(404).json({ success: false, message: 'Profesor no encontrado' });
  res.json({ success: true, data: profesor });
});

// POST - Crea un nuevo profesor
router.post('/', (req, res) => {
  const { nombre, email, materia, activo } = req.body;
  if (!nombre || !email || !materia) {
    return res.status(400).json({ success: false, message: 'Faltan datos obligatorios' });
  }
  const nuevo = { id: nextId++, nombre, email, materia, activo: activo ?? true };
  profesores.push(nuevo);
  res.status(201).json({ success: true, data: nuevo });
});

// PUT - Actualiza un profesor
router.put('/:id', (req, res) => {
  const index = profesores.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Profesor no encontrado' });
  profesores[index] = { ...profesores[index], ...req.body };
  res.json({ success: true, data: profesores[index] });
});

// DELETE - Elimina un profesor
router.delete('/:id', (req, res) => {
  const index = profesores.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Profesor no encontrado' });
  const eliminado = profesores.splice(index, 1);
  res.json({ success: true, message: 'Profesor eliminado', data: eliminado });
});

module.exports = router;

