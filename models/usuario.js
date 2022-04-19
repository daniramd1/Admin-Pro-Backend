const { Schema, model } = require('mongoose');

const UsuarioShema = Schema({ //Se estructura el usuario

    nombre: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true //tiene que ser unico  no puede haber correo duplicado
    },
    password: {
        type: String,
        required: true,

    },
    img: {
        type: String,

    },
    rol: {
        type: String,
        required: true, //todos los usuarios tienen que tener un rol
        default: 'USER_ROLE'

    },
    google: {
        type: Boolean,
        default: false

    },
});

UsuarioShema.method('toJSON', function() { //para modificar el id del Shema global
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id; //es para cambiar de _id a uid
    return object;
});

module.exports = model(' Usuario ', UsuarioShema); //con esto ya expongo el modelo de usuarios