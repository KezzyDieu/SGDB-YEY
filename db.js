// db.js
const mysql = require('mysql2/promise');


// Configura la conexión a la base de datos
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: ''
});

// Exporta el pool promisificado
module.exports = pool;
