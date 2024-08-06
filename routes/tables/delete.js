const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/delete', (req, res) => {
  const { dbName, tableName } = req.body;

  if (!dbName || !tableName) {
    return res.status(400).send('Database name and table name are required');
  }

  const query = `DROP TABLE ${dbName}.${tableName}`;

  db.query(query, (err) => {
    if (err) {
      return res.status(500).send('Error deleting table');
    }
    res.send('Table deleted successfully');
  });
});

module.exports = router;
