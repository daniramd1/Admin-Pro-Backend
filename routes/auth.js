/* 
    RUTA: '/api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator'); //para validar datos
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const { login, googleSignIn, renewToken } = require('../controllers/auth')

const router = Router();

router.post('/', [

        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,

    ],
    login);

router.post('/google', [

        check('token', 'El token de Google es obligatorio').not().isEmpty(),

        validarCampos,

    ],
    googleSignIn);

//por si ya expiro el token sacarlo de la sesion y renovarlo

router.get('/renew', validarJWT, renewToken);




module.exports = router;