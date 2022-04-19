/* 
    RUTA: /api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator'); //para validar datos
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales');


const router = Router();

router.get('/', getHospitales); //archivo para mandar a traer todas las rutas en (controllers.usuarios)

router.post('/', [
    //aqui de ponen los middewerls
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos


], crearHospital); //archivo para capturar los usuarios 


router.put('/:id', [


], actualizarHospital);


router.delete('/:id', borrarHospital);

module.exports = router;