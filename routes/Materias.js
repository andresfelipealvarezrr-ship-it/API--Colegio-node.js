const express = require('express');
const router = express.Router();

let materias = [
  { id: 1, nombre: "Matemáticas", descripcion: "Álgebra y geometría", activa: true },
  { id: 2, nombre: "Español", descripcion: "Gramática y literatura", activa: true },
  { id: 3, nombre: "Ciencias", descripcion: "Biología y química", activa: true }
];

let nextId = 4;

// GET - Lista todas las materias (con filtros opcionales)
router.get('/', (req, res) => {
  const token = req.headers['authorization'];
  const filtros = req.query;

  let data = materias.filter(m =>
    Object.entries(filtros).every(([k, v]) =>
      m[k]?.toString().toLowerCase().includes(v.toLowerCase())
    )
  );

  res.json({ success: true, headers: { token }, total: data.length, data });
});

// GET - Busca una materia por ID
router.get('/:id', (req, res) => {
  const materia = materias.find(m => m.id === parseInt(req.params.id));
  if (!materia) return res.status(404).json({ success: false, message: 'Materia no encontrada' });
  res.json({ success: true, data: materia });
});

// POST - Crea una nueva materia
router.post('/', (req, res) => {
 const { nombre, descripcion, activa } = req.body;
if (!nombre || !descripcion) {
    return res.status(400).json({ success: false, message: 'Faltan datos obligatorios' });
  }
  const nueva = { id: nextId++, nombre, descripcion, activa: activa ?? true };
  materias.push(nueva);
  res.status(201).json({ success: true, data: nueva });
});

// PUT - Actualiza una materia
router.put('/:id', (req, res) => {
  const index = materias.findIndex(m => m.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Materia no encontrada' });
  materias[index] = { ...materias[index], ...req.body };
  res.json({ success: true, data: materias[index] });
});

// DELETE - Elimina una materia
router.delete('/:id', (req, res) => {
  const index = materias.findIndex(m => m.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Materia no encontrada' });
  const eliminada = materias.splice(index, 1);
  res.json({ success: true, message: 'Materia eliminada', data: eliminada });
});

module.exports = router;
