require('dotenv').config(); //te permite hacer variables de entorno y utilizarlas en .env

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


//usuario: danielramd
//contraseña: Meenamoredeti1

//crear el servidor express
const app = express();

//Configurar Cors
app.use(cors());

//Base de datos
dbConnection();


//Rutas
app.get('/', (solicitan, responde) => { // lo que se va a ejecutar cuando alguien solicite /

    responde.json({ //se responde en json y es un objeto
        ok: true,
        msg: 'Hola Mundo',
    });
});

app.listen(process.env.PORT, () => { //se crea el puerto a utilizar y viene un call back

    console.log('servidor corriendo en puerto ' + process.env.PORT);

});