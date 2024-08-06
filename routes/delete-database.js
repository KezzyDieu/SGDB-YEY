const express = require('express');
const router = express.Router();

// Renderiza la página para eliminar una base de datos
router.get('/delete', (req, res) => {
  res.render('delete-database');
});

// Maneja la eliminación de una base de datos
router.post('/delete', (req, res) => {
  const dbName = req.body.dbName;
  if (!dbName) {
    return res.status(400).send('Database name is required.');
  }

  req.db.query(`DROP DATABASE ${dbName}`, (err) => {
    if (err) {
      return res.status(500).send('Error deleting database.');
    }

    req.flash('message', 'Database deleted successfully!');
    res.redirect('/');
  });
});

module.exports = router;
