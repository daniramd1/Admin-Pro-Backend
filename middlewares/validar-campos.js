const { response } = require('express');
const { validationResult } = require('express-validator'); //para validar datos




const validarCampos = (solicitan, responder = response, next) => {

    const errores = validationResult(solicitan);

    //con esto ya valido que todos los campos sean correctos
    if (!errores.isEmpty()) { //si no esta vacio significa que hay errores
        return responder.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();

}

module.exports = {
    validarCampos,
}