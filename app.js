//importar las dependencias necesarias
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cokkieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();
const usersRouter = require('./controllers/users');
const { PAGE_URL }  = require('./config');



//funcion autoinvocada
(async() => {

    try {
        await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log('Conexión a la base de datos establecida');
    } catch (error) {
        console.error(error);
    }

})();

app.use(cors());
app.use(express.json());
app.use(cokkieParser());


//rutas frontend
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/media', express.static(path.resolve('views', 'media')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));

app.use(express.static('src'));

app.use(morgan('tiny'));

//rutas backend
app.use('/api/users', usersRouter);



console.log(`Servidor corriendo en ${PAGE_URL}`);


module.exports = app;


module.exports = app;
