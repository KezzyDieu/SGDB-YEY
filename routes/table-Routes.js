const express = require('express');
const router = express.Router();

// Renderiza la página para crear una tabla
router.get('/create', (req, res) => {
  res.render('create-table');
});

// Maneja la creación de una tabla
router.post('/create', (req, res) => {
  const { dbName, tableName, fields } = req.body;
  if (!dbName || !tableName || !fields) {
    req.flash('message', 'Database name, table name, and fields are required.');
    return res.redirect('/');
  }

  // Genera la consulta SQL para crear la tabla
  const query = `CREATE TABLE \`${dbName}\`.\`${tableName}\` (${fields})`;
  
  req.db.query(query, (err) => {
    if (err) {
      req.flash('message', 'Error creating table.');
      return res.redirect('/');
    }
    req.flash('message', 'Table created successfully.');
    res.redirect('/');
  });
});

// Renderiza la página para modificar una tabla
router.get('/modify', (req, res) => {
  res.render('modify-table');
});

router.post('/modify', async (req, res) => {
  const { dbName, tableName, action, oldFieldName, newFieldName, fieldType, isPrimary, fieldNameToDelete } = req.body;

  if (!dbName || !tableName || !action) {
    req.flash('message', 'Incomplete data to modify the table.');
    return res.redirect('/');
  }

  try {
    if (action === 'modify') {
      if (!oldFieldName || !newFieldName) {
        req.flash('message', 'Incomplete data to modify the field.');
        return res.redirect('/');
      }

      let query = `ALTER TABLE \`${dbName}\`.\`${tableName}\` CHANGE COLUMN \`${oldFieldName}\` \`${newFieldName}\` ${fieldType}`;

      if (isPrimary === '1') {
        query += ', ADD PRIMARY KEY (\`${newFieldName}\`)';
      }

      await new Promise((resolve, reject) => {
        req.db.query(query, (err) => {
          if (err) reject(err);
          resolve();
        });
      });
      req.flash('message', 'Field modified sucsesfully');
    } else if (action === 'delete') {
      if (!fieldNameToDelete) {
        req.flash('message', 'Incomplete data to remove the field.');
        return res.redirect('/');
      }

      const query = `ALTER TABLE \`${dbName}\`.\`${tableName}\` DROP COLUMN \`${fieldNameToDelete}\``;
      await new Promise((resolve, reject) => {
        req.db.query(query, (err) => {
          if (err) reject(err);
          resolve();
        });
      });
      req.flash('message', 'Field Successfully Removed');
    } else {
      req.flash('message', 'Invalid action.');
    }
    res.redirect('/');
  } catch (error) {
    console.error(error);
    req.flash('message', 'Error Modifying Table.');
    res.redirect('/');
  }
});

// Renderiza la página para eliminar una tabla
router.get('/delete', (req, res) => {
  res.render('delete-table');
});

// Maneja la eliminación de una tabla
router.post('/delete', (req, res) => {
  const { dbName, tableName } = req.body;
  if (!dbName || !tableName) {
    req.flash('message', 'Database name and table name are required.');
    return res.redirect('/');
  }

  // Genera la consulta SQL para eliminar la tabla
  const query = `DROP TABLE \`${dbName}\`.\`${tableName}\``;

  req.db.query(query, (err) => {
    if (err) {
      req.flash('message', 'Error deleting table.');
      console.error(err); // Añadido para depuración
      return res.redirect('/');
    }
    req.flash('message', 'Table deleted successfully.');
    res.redirect('/');
  });
});

module.exports = router;
