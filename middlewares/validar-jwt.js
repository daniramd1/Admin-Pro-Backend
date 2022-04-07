const jwt = require('jsonwebtoken');






const validarJWT = (solicita, responde, next) => {

    //Leer el Token
    const token = solicita.header('x-token');


    if (!token) {
        return responde.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        responde.uid = uid;

    } catch (error) {

        return responde.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        });
    }

    next();
}

module.exports = {
    validarJWT,
}