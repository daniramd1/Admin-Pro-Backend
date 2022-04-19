/* 
    RUTA: /api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator'); //para validar datos
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos');


const router = Router();

router.get('/', getMedicos); //archivo para mandar a traer todas las rutas en (controllers.usuarios)

router.post('/', [
    //aqui de ponen los middewerls
    validarJWT,
    check('nombre', 'El nombre del Medico es necesario').not().isEmpty(),
    check('hospiital', 'El hospitalID debe de ser valido').isMongoId(),
    validarCampos

], crearMedico); //archivo para capturar los usuarios 


router.put('/:id', [


], actualizarMedico);


router.delete('/:id', borrarMedico);

module.exports = router;