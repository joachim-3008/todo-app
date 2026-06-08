//importar las dependencias necesarias
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();



//funcion autoinvocada
(async() => {

    try {
        await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log('Conexión a la base de datos establecida');
    } catch (error) {
        console.error(error);
    }

})();

//rutas frontend
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/register', express.static(path.resolve('views', 'register')));
app.use('/media', express.static(path.resolve('views', 'media')));

app.use(express.static('src'));







module.exports = app;


