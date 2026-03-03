const express = require('express');
const router = express.Router();

let notas = [
  { id: 1, estudianteId: 1, materiaId: 1, nota: 4.5, periodo: "1", fecha: "2024-01-15" },
  { id: 2, estudianteId: 2, materiaId: 2, nota: 3.8, periodo: "1", fecha: "2024-01-15" },
  { id: 3, estudianteId: 3, materiaId: 3, nota: 4.2, periodo: "1", fecha: "2024-01-15" }
];

let nextId = 4;

// GET - Lista todas las notas (con filtros opcionales)
router.get('/', (req, res) => {
  const token = req.headers['authorization'];
  const filtros = req.query;

  let data = notas.filter(n =>
    Object.entries(filtros).every(([k, v]) =>
      n[k]?.toString().toLowerCase().includes(v.toLowerCase())
    )
  );

  res.json({ success: true, headers: { token }, total: data.length, data });
});

// GET - Busca una nota por ID
router.get('/:id', (req, res) => {
  const nota = notas.find(n => n.id === parseInt(req.params.id));
  if (!nota) return res.status(404).json({ success: false, message: 'Nota no encontrada' });
  res.json({ success: true, data: nota });
});

// POST - Crea una nueva nota
router.post('/', (req, res) => {
  const { estudianteId, materiaId, nota } = req.body;
  if (!estudianteId || !materiaId || !nota) {
    return res.status(400).json({ success: false, message: 'Faltan datos obligatorios' });
  }
  const nueva = { id: nextId++, estudianteId, materiaId, nota };
  notas.push(nueva);
  res.status(201).json({ success: true, data: nueva });
});

// PUT - Actualiza una nota
router.put('/:id', (req, res) => {
  const index = notas.findIndex(n => n.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Nota no encontrada' });
  notas[index] = { ...notas[index], ...req.body };
  res.json({ success: true, data: notas[index] });
});

// DELETE - Elimina una nota
router.delete('/:id', (req, res) => {
  const index = notas.findIndex(n => n.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Nota no encontrada' });
  const eliminada = notas.splice(index, 1);
  res.json({ success: true, message: 'Nota eliminada', data: eliminada });
});

module.exports = router;
