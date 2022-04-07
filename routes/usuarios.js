/* 
    RUTA: '/api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator'); //para validar datos
const { validarCampos } = require('../middlewares/validar-campos')

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', validarJWT, getUsuarios); //archivo para mandar a traer todas las rutas en (controllers.usuarios)

router.post('/', [
    //aqui de ponen los middewerls

    check('nombre', 'El nombre es obligatorio').not().isEmpty(), // que el nombre no tiene que estar vacio ( es obligatorio)
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(), //tiene que ser email
    validarCampos,

], crearUsuario); //archivo para capturar los usuarios 


router.put('/:id', [

    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), // que el nombre no tiene que estar vacio ( es obligatorio)
    check('email', 'El email es obligatorio').isEmail(), //tiene que ser email
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,

], actualizarUsuario);


router.delete('/:id', validarJWT, borrarUsuario);

module.exports = router;