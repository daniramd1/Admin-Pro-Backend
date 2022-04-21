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


    const id = solicitan.params.id;
    const uid = responder.uid;

    try {
        const medico = await Medico.findById(id);

        if (!medico) {
            return responder.status(404).json({
                ok: false,
                msg: 'Medico no encontrado por ID'
            });
        }

        const cambiosMedico = {
            ...solicitan.body,
            usuario: uid,

        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        responder.json({
            ok: true,
            msg: 'Medico Actualizado',
            medico: medicoActualizado,
        });
    } catch (error) {
        console.log(error)
        responder.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const borrarMedico = async(solicitan, responder = response) => {


    const id = solicitan.params.id;


    try {
        const medico = await Medico.findById(id);

        if (!medico) {
            return responder.status(404).json({
                ok: false,
                msg: 'Medico no encontrado por ID'
            });
        }


        await Medico.findByIdAndDelete(id);

        responder.json({
            ok: true,
            msg: 'Medico Borrado',

        });
    } catch (error) {
        console.log(error)
        responder.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,

}