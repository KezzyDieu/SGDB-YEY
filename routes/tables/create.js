const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/create-database', (req, res) => {
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

module.exports = router;
