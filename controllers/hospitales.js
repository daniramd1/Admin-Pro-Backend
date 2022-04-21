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

    const id = solicitan.params.id;
    const uid = responder.uid;

    try {
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return responder.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por ID'
            });
        }
        /* hospital.nombre =  solicitan.body.nombre; */
        const cambiosHospital = {
            ...solicitan.body,
            usuario: uid,

        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        responder.json({
            ok: true,
            msg: 'Hospital Actualizado',
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log(error)
        responder.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const borrarHospital = async(solicitan, responder = response) => {


    const id = solicitan.params.id;


    try {
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return responder.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por ID'
            });
        }


        await Hospital.findByIdAndDelete(id);

        responder.json({
            ok: true,
            msg: 'Hospital Borrado',

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
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital,

}