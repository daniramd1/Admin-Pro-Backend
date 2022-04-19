const { response } = require('express');

const Hospital = require('../models/hospital');





const getHospitales = async(solicitan, responder = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre img'); // quiero de la tabla usuario el nombre del usuario y su img

    responder.json({
        ok: true,
        hospitales
    });


}

const crearHospital = async(solicitan, responder = response) => {

    const uid = responder.uid;

    const hospital = new Hospital({
        usuario: uid,
        ...solicitan.body
    });

    try {

        const hospitalDB = await hospital.save();

        responder.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error)
        responder.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}


const actualizarHospital = async(solicitan, responder = response) => {


    responder.json({
        ok: true,
        msg: 'actualizarHospital'
    });
}

const borrarHospital = async(solicitan, responder = response) => {


    responder.json({
        ok: true,
        msg: 'borrarHospital'
    });
}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital,

}