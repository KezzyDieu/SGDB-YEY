const express = require('express');
const router = express.Router();
const db = require('../app'); // Asegúrate de que la conexión se está exportando correctamente

// Renderiza la página para insertar un registro
router.get('/insert', (req, res) => {
  res.render('insert-record');
});

// Maneja la inserción de un registro
router.post('/insert', (req, res) => {
  const { dbName, tableName, fields } = req.body;
  if (!dbName || !tableName || !fields) {
    return res.status(400).send('Database name, table name, and fields are required.');
  }

  const query = `INSERT INTO ${dbName}.${tableName} (${fields})`;

  db.query(query, (err) => {
    if (err) {
      return res.status(500).send('Error inserting record.');
    }
    res.redirect('/');
  });
});

// Renderiza la página para eliminar un registro
router.get('/delete', (req, res) => {
  res.render('delete-record');
});

// Maneja la eliminación de un registro
router.post('/delete', (req, res) => {
  const { dbName, tableName, condition } = req.body;
  if (!dbName || !tableName || !condition) {
    return res.status(400).send('Database name, table name, and condition are required.');
  }

  const query = `DELETE FROM ${dbName}.${tableName} WHERE ${condition}`;

  db.query(query, (err) => {
    if (err) {
      return res.status(500).send('Error deleting record.');
    }
    res.redirect('/');
  });
});

// Renderiza la página para actualizar un registro
router.get('/update', (req, res) => {
  res.render('update-record');
});

// Maneja la actualización de un registro
router.post('/update', (req, res) => {
  const { dbName, tableName, updates, condition } = req.body;
  if (!dbName || !tableName || !updates || !condition) {
    return res.status(400).send('Database name, table name, updates, and condition are required.');
  }

  const query = `UPDATE ${dbName}.${tableName} SET ${updates} WHERE ${condition}`;

  db.query(query, (err) => {
    if (err) {
      return res.status(500).send('Error updating record.');
    }
    res.redirect('/');
  });
});

// Renderiza la página para mostrar registros
router.get('/show', (req, res) => {
  res.render('show-records');
});

// Maneja la visualización de registros
router.post('/show', (req, res) => {
  const { dbName, tableName } = req.body;
  if (!dbName || !tableName) {
    return res.status(400).send('Database name and table name are required.');
  }

  const query = `SELECT * FROM ${dbName}.${tableName}`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching records.');
    }
    res.render('show-records', { records: results });
  });
});

module.exports = router;
