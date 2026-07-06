// ==========================================
// IMPORTAR DEPENDENCIAS
// ==========================================
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const todoRouter = require('./controllers/todos');
const { PAGE_URL } = require('./config');
const { userExtractor } = require('./middleware/auth');

//funcion autoinvocada
(async() => {

    try {
        await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log('Conexión a la base de datos establecida');
    } catch (error) {
        console.error('Error al conectar a la BD:', error);
    }
})();

// ==========================================
// MIDDLEWARES GLOBALES (Confi)
// ==========================================
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny')); // registra las peticiones en la terminal

// ==========================================
// RUTAS PARA ARCHIVOS ESTaTICOS GLOBALES
// ==========================================
// Esto permite que /login, /signup o /todo puedan acceder a sus estilos, imágenes y componentes comunes
app.use('/styles', express.static(path.resolve('src')));
app.use('/media', express.static(path.resolve('views', 'media')));
app.use('/components', express.static(path.resolve('views', 'components')));

// ==========================================
// RUTAS PARA LAS VISTAS (HTML)
// ==========================================
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/todo', express.static(path.resolve('views', 'todo')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));

app.use(express.static('src'));

app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

// ==========================================
// RUTAS DEL BACKEND (APIs)
// ==========================================
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/todos', userExtractor, todoRouter);


console.log(`Servidor corriendo en ${PAGE_URL}`);

module.exports = app;