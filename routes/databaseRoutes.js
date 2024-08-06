const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta para crear una base de datos
router.post('/create', (req, res) => {
  const { dbName } = req.body;

  if (!dbName) {
    return res.status(400).send('Database name is required');
  }

  db.query(`CREATE DATABASE ${dbName}`, (err) => {
    if (err) {
      return res.status(500).send('Error creating database');
    }
    res.send('Database created successfully');
  });
});

// Ruta para eliminar una base de datos
router.post('/delete', (req, res) => {
  const { dbName } = req.body;

  if (!dbName) {
    return res.status(400).send('Database name is required');
  }

  db.query(`DROP DATABASE ${dbName}`, (err) => {
    if (err) {
      return res.status(500).send('Error deleting database');
    }
    res.send('Database deleted successfully');
  });
});

module.exports = router;
