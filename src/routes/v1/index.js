const express = require('express');
const router = express.Router();

//Inmportar rutas especificas
const usersRoutes = require('./users.routes');

//Configurar las rutas
router.use('/users', usersRoutes);

module.exports = router;
    