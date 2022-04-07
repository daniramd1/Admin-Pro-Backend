const jwt = require('jsonwebtoken');
require('dotenv').config();




const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid: uid
        };

        jwt.sign(payload, process.env.JWT_SECRET, { // lo que vamos a firmar y de ahi viene la palabra secreta  y tercer argumento es la expiracion del token

            expiresIn: '12h' //un usuario puede mantener sesion durante 12horas

        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT ');

            } else {
                resolve(token);
            }

        });

    });

}

module.exports = {
    generarJWT,
}