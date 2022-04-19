const { Schema, model } = require('mongoose');



const HospitalShema = Schema({ //Se estructura el usuario

        nombre: {
            type: String,
            required: true
        },
        img: {
            type: String,

        },
        usuario: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: ' Usuario ',
        },
    }, { collection: 'hospitales' } //para que en la BD salga con ese nombre
);

HospitalShema.method('toJSON', function() { //para modificar el id del Shema global
    const { __v, ...object } = this.toObject();

    return object;
});

module.exports = model(' Hospital ', HospitalShema); //con esto ya expongo el modelo de usuarios