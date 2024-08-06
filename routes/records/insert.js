const express = require('express');
const router = express.Router();
const db = require('../../db'); // Asegúrate de que db está configurado para usar promesas

router.get('/insert', (req, res) => {
  res.render('insert-record');
});

router.post('/insert', async (req, res) => {
  console.log(req.body); // Imprime el contenido de req.body para depuración

  const { dbName, tableName, columns, values } = req.body;

  if (!dbName || !tableName || !Array.isArray(columns) || !Array.isArray(values)) {
    req.flash('message', 'Database name, table name, columns, and values are required');
    return res.redirect('/');
  }

  if (columns.length !== values.length) {
    req.flash('message', 'The number of columns must match the number of values');
    return res.redirect('/');
  }

  const columnsList = columns.map(col => `\`${col}\``).join(', ');
  const valuesList = values.map(val => `'${val}'`).join(', ');

  const query = `INSERT INTO \`${dbName}\`.\`${tableName}\` (${columnsList}) VALUES (${valuesList})`;

  try {
    await db.query(query); // Usa promesas en lugar de callback
    req.flash('message', 'Record inserted successfully');
  } catch (err) {
    console.error(err);
    req.flash('message', 'Error inserting record');
  }
  
  res.redirect('/');
});

module.exports = router;
