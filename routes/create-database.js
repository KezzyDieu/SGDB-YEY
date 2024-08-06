const express = require('express');
const router = express.Router();

// Renderiza la página para crear una base de datos
router.get('/create', (req, res) => {
  res.render('create-database');
});

// Maneja la creación de una base de datos
router.post('/create', (req, res) => {
  const dbName = req.body.dbName;
  if (!dbName) {
    return res.status(400).send('Database name is required.');
  }

  req.db.query(`CREATE DATABASE ${dbName}`, (err) => {
    if (err) {
      return res.status(500).send('Error creating database.');
    }
    
    req.flash('message', 'Database created successfully!');
    res.redirect('/');
  });
});

module.exports = router;
