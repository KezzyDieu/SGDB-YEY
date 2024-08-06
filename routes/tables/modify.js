const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/modify', (req, res) => {
  const { dbName, tableName, modifyQuery } = req.body;

  if (!dbName || !tableName || !modifyQuery) {
    return res.status(400).send('Database name, table name, and modify query are required');
  }

  const query = `ALTER TABLE ${dbName}.${tableName} ${modifyQuery}`;

  db.query(query, (err) => {
    if (err) {
      return res.status(500).send('Error modifying table');
    }
    res.send('Table modified successfully');
  });
});

module.exports = router;
