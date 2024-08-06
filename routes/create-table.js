const express = require('express');
const router = express.Router();

// Renderiza la página para crear una tabla
router.get('/create', (req, res) => {
  res.render('create-table');
});

// Maneja la creación de una tabla
router.post('/create', (req, res) => {
  const dbName = req.body.dbName;
  const tableName = req.body.tableName;
  const fieldNames = req.body.fieldName;
  const fieldTypes = req.body.fieldType;
  const fieldSizes = req.body.fieldSize;
  const primaryKeys = req.body.primaryKey || [];

  if (!dbName || !tableName || !fieldNames.length) {
    return res.status(400).send('Database name, table name, and at least one field are required.');
  }

  // Construye la consulta SQL para crear la tabla
  let sql = `CREATE TABLE ${dbName}.${tableName} (`;
  fieldNames.forEach((name, index) => {
    let type = fieldTypes[index];
    let size = fieldSizes[index] ? `(${fieldSizes[index]})` : '';
    let primaryKey = primaryKeys[index] ? ' PRIMARY KEY' : '';
    sql += `${name} ${type}${size}${primaryKey}, `;
  });

  // Elimina la última coma y espacio
  sql = sql.slice(0, -2) + ')';

  req.db.query(sql, (err) => {
    if (err) {
      return res.status(500).send('Error creating the table.');
    }

    req.flash('message', 'Table Created Sucsesfully!');
    res.redirect('/');
  });
});

module.exports = router;
