const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const Usuario = require('../models/usuario') //Importamos nuestro Schema para meter datos



const getUsuarios = async(solicitan, responder) => { // lo que se va a ejecutar cuando alguien solicite /

    const desde = Number(solicitan.query.desde) || 0; // el query es lo que escribas despues del ?desde=5 por ejemplo para decir cuantos resultados quieres si no mandan el numero sera un 0 por defecto

    /*   const usuarios = await Usuario.find({}, 'nombre email role google') //se buscan los usuarios en la BD 
          .skip(desde) // decimos que queremos datos a partir del numero
          .limit(5);

      const totalusuarios = await Usuario.count(); */

    const [usuarios, totalusuarios] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
        .skip(desde)
        .limit(5),

        Usuario.countDocuments()

    ]);



    responder.json({ //se responde en json y es un objeto
        ok: true,
        usuarios,
        uid: responder.uid,
        totalusuarios
    });
}



const crearUsuario = async(solicitan, responder = response) => { // lo que se va a ejecutar cuando alguien solicite /

    const { email, password, nombre } = solicitan.body; //desestructuramos



    try {

        //const existeEmail = Usuario.findOne({email: 'danielramd@hotmail.com'});
        const existeEmail = await Usuario.findOne({ email }); // jalo el email que viene en el body para encontrarlo

        if (existeEmail) {
            return responder.status(400).json({ //respondemos en caso de que el correo ya existe

                ok: false,
                msg: 'El correo ingresado ya existe en la BD'
            });
        }


        const usuario = new Usuario(solicitan.body);


        //ENCRIPTAR CONTRASEÑA
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt); //se le manda el password y el salt que es de manera aleatoria

        await usuario.save(); //guardamos el usuario en la base de datos

        //Generar Token JWT   
        const token = await generarJWT(usuario.id);

        responder.json({ //se responde en json y es un objeto
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        responder.status(500).json({
            ok: false,
            msg: 'Error inesperado Revisar logs'
        });
    }



}

const actualizarUsuario = async(solicitan, responder = response) => {

    const uid = solicitan.params.id; //params porque recibimos el id del url /:id

    try {

        const usuarioDB = await Usuario.findById(uid); //funcion para buscar por el id que recibimos

        if (!usuarioDB) { // si no existe
            return responder.status(404).json({ //respondemos en caso de que el usuario no exista
                ok: false,
                msg: 'No existe un usuario con ese ID'
            });
        }

        // ACTUALIZACION
        const campos = solicitan.body;

        if (usuarioDB.email === solicitan.body.email) {
            delete campos.email;
        } else { //significa que quiere cambiar el emal

            //pero si el email ya existe mandamos error
            const existeEmail = await Usuario.findOne({ email: solicitan.body.email });
            if (existeEmail) {
                return responder.status(400).json({
                    ok: false,
                    msg: ('Ya existe un usuario con ese Email')

                });
            }
        }

        delete campos.password;
        delete campos.google;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        responder.json({
            ok: true,
            usuarioActualizado

        });

    } catch (error) {
        console.log(error);
        responder.status(500).json({

            ok: false,
            msg: 'Error Inesperado'
        });
    }
}

const borrarUsuario = async(solicitan, responder = response) => {

    const uid = solicitan.params.id;
    try {
        //No podemos borrar un usuario que no exista en la BD

        const usuarioDB = await Usuario.findById(uid); //funcion para buscar por el id que recibimos

        if (!usuarioDB) { // si no existe
            return responder.status(404).json({ //respondemos en caso de que el usuario no exista
                ok: false,
                msg: 'No existe un usuario con ese ID'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        responder.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        console.log(error);
        responder.status(500).json({

            ok: false,
            msg: 'Error Inesperado al eliminar'
        });
    }

}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
}