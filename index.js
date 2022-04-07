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

//Lectura y parseo del body
app.use(express.json()); //se coloca antes de las rutas


//Base de datos
dbConnection();


//Rutas
app.use('/api/usuarios', require('./routes/usuarios')); //definimos la ruta y de donde sacaremos las rutas
app.use('/api/login', require('./routes/auth'));


/* app.get('/api/usuarios', (solicitan, responde) => { // lo que se va a ejecutar cuando alguien solicite /

    responde.json({ //se responde en json y es un objeto
        ok: true,
        usuarios: [{
            id: 123,
            nombre: 'Daniel',

        }]
    });
}); */

app.listen(process.env.PORT, () => { //se crea el puerto a utilizar y viene un call back

    console.log('servidor corriendo en puerto ' + process.env.PORT);

});