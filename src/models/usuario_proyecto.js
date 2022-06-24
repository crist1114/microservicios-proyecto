const mongoose = require('mongoose');

const usr_proyectSchema = mongoose.Schema({

    idProyecto : {
        type: String,
        require: true
    },
    idUsuario: {
        type: String,
        require: true
    },
    lider: {
        type: Boolean,
        require: true
    }

});
module.exports = mongoose.model('usuarios_proyectos', usr_proyectSchema);