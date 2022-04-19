const { response } = require('express');

const Medico = require('../models/medico');


const getMedicos = async(solicitan, responder = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img'); // quiero de la tabla usuario el nombre del usuario y su img


    responder.json({
        ok: true,
        medicos
    });
}

const crearMedico = async(solicitan, responder = response) => {


    const uid = responder.uid;

    const medico = new Medico({
        usuario: uid,
        //hospital: solicitan.body.hospital,
        ...solicitan.body
    });

    try {

        const medicoDB = await medico.save();

        responder.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error)
        responder.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}


const actualizarMedico = async(solicitan, responder = response) => {


    responder.json({
        ok: true,
        msg: 'actualizarMedico'
    });
}

const borrarMedico = async(solicitan, responder = response) => {


    responder.json({
        ok: true,
        msg: 'borrarMedico'
    });
}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,

}