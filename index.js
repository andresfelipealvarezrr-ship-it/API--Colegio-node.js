const express = require('express');
const app = express();

app.use(express.json());

const Estudiantes = require('./routes/Estudiantes');
const Profesores = require('./routes/Profesores');
const materias = require('./routes/Materias');
const notas = require('./routes/Notas');

app.use('/estudiantes', Estudiantes);
app.use('/profesores', Profesores);
app.use('/materias', materias);
app.use('/notas', notas);

const server = app.listen(3000, () =>
  console.log(`API corriendo en http://localhost:${server.address().port}`)
);



