const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Para analizar JSON en el cuerpo de las peticiones

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Rutas y Endpoints para los CRUD de clientes y productos

// CRUD para Clientes
app.get('/clientes', (req, res) => {
  db.query('SELECT * FROM clientes', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post('/clientes', (req, res) => {
  const { nombre, email } = req.body;
  db.query('INSERT INTO clientes (nombre, email) VALUES (?, ?)', [nombre, email], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, nombre, email });
  });
});

app.put('/clientes/:id', (req, res) => {
  const { nombre, email } = req.body;
  db.query('UPDATE clientes SET nombre = ?, email = ? WHERE id = ?', [nombre, email, req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('Cliente actualizado');
  });
});

app.delete('/clientes/:id', (req, res) => {
  db.query('DELETE FROM clientes WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('Cliente eliminado');
  });
});

// CRUD para Productos
app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post('/productos', (req, res) => {
  const { nombre, precio } = req.body;
  db.query('INSERT INTO productos (nombre, precio) VALUES (?, ?)', [nombre, precio], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, nombre, precio });
  });
});

app.put('/productos/:id', (req, res) => {
  const { nombre, precio } = req.body;
  db.query('UPDATE productos SET nombre = ?, precio = ? WHERE id = ?', [nombre, precio, req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('Producto actualizado');
  });
});

app.delete('/productos/:id', (req, res) => {
  db.query('DELETE FROM productos WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('Producto eliminado');
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});
