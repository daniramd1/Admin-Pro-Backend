const { Schema, model } = require('mongoose');

const MedicoShema = Schema({ //Se estructura el usuario

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,

    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: ' Usuario ',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: ' Hospital ',
        required: true
    },
}, );

MedicoShema.method('toJSON', function() { //para modificar el id del Shema global
    const { __v, ...object } = this.toObject();

    return object;
});

module.exports = model(' Medico ', MedicoShema); //con esto ya expongo el modelo de usuarios