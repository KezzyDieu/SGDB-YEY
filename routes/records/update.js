const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/update', (req, res) => {
  res.render('update-record');
});

router.post('/update', async (req, res) => {
  const { dbName, tableName, recordId } = req.body;
  const fields = req.body.fields;
  const values = req.body.values;

  if (!dbName || !tableName || !fields || !values || !recordId) {
    req.flash('message', 'Database name, table name, fields, values, and record ID are required.');
    return res.redirect('/');
  }

  const setClauses = fields.map((field, index) => `\`${field}\` = '${values[index]}'`).join(', ');
  const query = `UPDATE \`${dbName}\`.\`${tableName}\` SET ${setClauses} WHERE id = '${recordId}'`;

  try {
    await db.query(query);
    req.flash('message', 'Record updated successfully.');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('message', 'Error updating record.');
    res.redirect('/');
  }
});

module.exports = router;
