const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');





const login = async(solicitan, responder = response) => {

    //Verificar Email
    const { email, password } = solicitan.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) { //si no existe el usuario no hay nada que logear

            return responder.status(404).json({
                ok: false,
                msg: 'Email Invalidos'
            });
        }

        //Verificar Contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password); //se compara la que escribio el usuario password con la de la BD
        if (!validPassword) {
            return responder.status(404).json({
                ok: false,
                msg: 'Contraseña invalida'
            });
        }

        //Generar Token JWT   (Hasta aqui significa que la contra y el email estan correctos)
        const token = await generarJWT(usuarioDB.id);



        responder.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        responder.status(500).json({
            ok: false,
            msg: 'Hable con el admi hubo un error'
        });
    }

}


const googleSignIn = async(solicitan, responder = response) => {

    const GoogleToken = solicitan.body.token;

    try {

        const { name, email, picture } = await googleVerify(GoogleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) { // si el usuario de google no existe se crea uno nuevo

            usuario = new Usuario({
                nombre: name,
                email: email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else { // si existe usuario

            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = '@@@';
        }
        //Guardar en BD
        await usuario.save();


        //Generar Token JWT   (Hasta aqui significa que la contra y el email estan correctos)
        const token = await generarJWT(usuario.id);

        responder.json({
            ok: true,
            token

        });

    } catch (error) {
        console.log(error);
        responder.status(500).json({
            ok: false,
            msg: 'El token no es correcto'
        });
    }

}

module.exports = {
    login,
    googleSignIn,
}