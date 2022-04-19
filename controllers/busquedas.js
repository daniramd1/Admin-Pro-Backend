const { response } = require('express');

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const { json } = require('express/lib/response');
const res = require('express/lib/response');




const getBusqueda = async(solicitan, responder = response) => {

    const busqueda = solicitan.params.busqueda;
    const regex = new RegExp(busqueda, 'i'); //expresion regular con eso se hacen busquedas mas flexibles con datos que coincidan por letra o algun factor 

    /*  const usuarios = await Usuario.find({ nombre: regex });
     const medicos = await Medico.find({ nombre: regex });
     const hospitales = await Hospital.find({ nombre: regex }); */

    const [usuarios, medicos, hospitales] = await Promise.all([

        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })

    ]);


    responder.json({
        ok: true,
        usuarios,
        medicos,
        hospitales

    });


}


const getDocumentosColeccion = async(solicitan, responder = response) => {

    const tabla = solicitan.params.tabla;
    const busqueda = solicitan.params.busqueda;
    const regex = new RegExp(busqueda, 'i'); //expresion regular con eso se hacen busquedas mas flexibles con datos que coincidan por letra o algun factor 

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');


            break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img');

            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex })

            break;

        default:
            return responder.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales',
            });


    }

    responder.json({
        ok: true,
        resultados: data,
    });




}


module.exports = {
    getBusqueda,
    getDocumentosColeccion
}