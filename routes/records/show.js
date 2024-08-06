const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/show', (req, res) => {
    res.render('show-records');
  });
  

  router.get('/shows', (req, res) => {
    const { dbName, tableName } = req.query;
  
    if (!dbName || !tableName) {
      return res.status(400).json({ error: 'Database name and table name are required.' });
    }
  
    const query = `SELECT * FROM \`${dbName}\`.\`${tableName}\``;
  
    req.db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching records:', error);
        return res.status(500).json({ error: 'Error fetching records.' });
      }
  
      console.log('Query executed:', query); // Verifica la consulta en la consola
      console.log('Records found:', results); // Verifica los registros encontrados
  
      res.json({ records: results });
    });
  });

module.exports = router;
