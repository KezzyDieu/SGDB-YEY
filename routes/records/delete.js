const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/delete', (req, res) => {
  res.render('delete-record');
});

router.post('/delete', async (req, res) => {
  const { dbName, tableName, fieldNames, fieldValues } = req.body;

  if (!dbName || !tableName || !fieldNames || !fieldValues) {
    req.flash('message', 'Database name, table name, and conditions are required.');
    return res.redirect('/');
  }

  if (fieldNames.length === 0 || fieldValues.length === 0) {
    req.flash('message', 'At least one condition is required.');
    return res.redirect('/');
  }

  try {
    // Build the WHERE clause from the provided field names and values
    const conditions = fieldNames.map((field, index) => `${field} = '${fieldValues[index]}'`).join(' AND ');
    const query = `DELETE FROM \`${dbName}\`.\`${tableName}\` WHERE ${conditions}`;

    await db.query(query);

    req.flash('message', 'Record deleted successfully.');
    res.redirect('/');
  } catch (error) {
    console.error(error);
    req.flash('message', 'Error deleting record.');
    res.redirect('/');
  }
});

module.exports = router;
