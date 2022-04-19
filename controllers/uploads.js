const path = require('path');
const fs = require('fs');

const { response } = require('express');

const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizarimagen');

//SE INSTALO NPM I EXPRESS-FILEUPLOAD PARA CARGAR IMAGENES en ROUTES

//TAMBIEN EL uuid para ponerle id a nuestra imagen


const fileUpload = async(solicitan, responder = response) => {

    const tipo = solicitan.params.tipo;
    const id = solicitan.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) { //se valida que venga el nombre valido
        return responder.status(400).json({
            ok: false,
            msg: 'No es un medico,usuario u hospital (tipo)',
        });
    }

    //Validar que exista un archivo

    if (!solicitan.files || Object.keys(solicitan.files).length === 0) {
        return responder.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo',
        });
    }

    //Procesar la imagen..

    const file = solicitan.files.imagen; // el nombre imagen es el nombre de como  la estas mandando en la peticion(form-data)

    const nombreCortado = file.name.split('.'); //angular1.2.3.4.jpg   asi tendremos un arreglo separado por los puntos
    const extesionArchivo = nombreCortado[nombreCortado.length - 1]; // aqui ya obtengo la extesion

    //Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if (!extensionesValidas.includes(extesionArchivo)) { //se valida que venga la extension como se marco
        return responder.status(400).json({
            ok: false,
            msg: 'No es una extension valida (tipo)',
        });
    }

    //Generar el nombre del Archivo

    const nombreArchivo = `${uuidv4()}.${extesionArchivo}`; //se coloca el id en vez de nombre con la extension jalada


    //Path para guardar la imagen

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Mover la imagen a donde queramos

    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen',

            });

        }

        //Actualizar Base de Datos
        actualizarImagen(tipo, id, nombreArchivo);

        responder.json({
            ok: true,
            msg: 'Archivo Subido',
            nombreArchivo,

        });
    });


}


const retornarImagen = async(solicitan, responder = response) => {

    const tipo = solicitan.params.tipo;
    const foto = solicitan.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`); //conseguimos todo el path de la ruta

    //imagen por defecto 

    if (fs.existsSync(pathImg)) {
        responder.sendFile(pathImg);

    } else { // si no existe la imagen ponemos una por defecto

        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        responder.sendFile(pathImg);


    }

}

module.exports = {
    fileUpload,
    retornarImagen,
}