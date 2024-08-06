const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const session = require('express-session');
const flash = require('connect-flash');

// Configuración de la aplicación
const app = express();
const port = 3000;

// Configura el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configura el middleware para parsear cuerpos de solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura el middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configura express-session y connect-flash
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the MySQL database.');
});

app.use((req, res, next) => {
  req.db = db;
  next();
});

// Rutas
const databaseRoutes = require('./routes/create-database');
const tableRoutes = require('./routes/create-table');
const recordRoutes = require('./routes/record-routes');
const deleteDatabaseRoutes = require('./routes/delete-database');
const tableroutes = require('./routes/table-Routes');
const insertrecor = require('./routes/records/insert');
const deleterecor = require('./routes/records/delete');
const updaterecor = require('./routes/records/update');
const showrecords = require('./routes/records/show');

app.use('/database', databaseRoutes);
app.use('/tables', tableRoutes);
app.use('/records', recordRoutes);
app.use('/delete-database', deleteDatabaseRoutes);
app.use('/table-Routes', tableroutes);
app.use('/insert-record', insertrecor);
app.use('/delete-record', deleterecor);
app.use('/update-record', updaterecor);
app.use('/show-records', showrecords)


// Manejo de la página de inicio
app.get('/', (req, res) => {
  res.render('index', { message: req.flash('message') });
});


// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = db;
