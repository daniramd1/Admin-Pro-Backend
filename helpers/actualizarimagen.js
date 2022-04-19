const fs = require('fs');

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');


const borrarImagen = (path) => {

    if (fs.existsSync(path)) { //si existe una imagen se borra :
        fs.unlinkSync(path); //se borrar la imagen anterior
    }
}

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No se encontro medico por id');
                return false
            }

            pathViejo = `./uploads/medicos/${medico.img}`; // se localiza la imagen perteneciente al id del usuario

            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;


            break;

        case 'hospitales':

            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No se encontro hospital por id');
                return false
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`; // se localiza la imagen perteneciente al id del usuario

            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

            break;

        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No se encontro usuario por id');
                return false
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`; // se localiza la imagen perteneciente al id del usuario

            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;

        default:
            break;
    }

}


module.exports = {
    actualizarImagen
}