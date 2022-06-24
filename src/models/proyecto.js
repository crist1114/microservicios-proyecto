const mongoose = require('mongoose');

const proyectoSchema = mongoose.Schema({
    id:{
        type: String,
        require: true 
    },
    nombre:{
        type: String,
        require: true
    },
    descripcion:{
        type: String,
        require: false
    },
    idProfesor:{
        type: String,
        require: false
    }
});

module.exports = mongoose.model('Proyecto', proyectoSchema);