const mongoose = require('mongoose');
require('dotenv').config(); //te permite hacer variables de entorno y utilizarlas en .env



const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.DB_CNN);
        console.log('BD Disponible')

    } catch (error) {

        console.log(error);
        throw new Error('Error al iniciar la BD')
    }


}

module.exports = {
    dbConnection
}