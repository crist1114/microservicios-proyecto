const { Console } = require('console');
const Model = require('../models/proyecto');
const Model2 = require('../models/usuario_proyecto')


function listProyectos(){

    return new Promise((resolve, reject)=>{
        let filter = {};

        
        Model.find(filter)
            .exec((err, populated)=>{
                if(err){
                    reject(err);
                    return false;
                }
                resolve(populated);
            });
    });
}
function listProyectosProfesor(idProfesor){

    return new Promise((resolve, reject)=>{
        let filter = {

                idProfesor : idProfesor,
          
        };

        
        Model.find(filter)
            .exec((err, populated)=>{
                if(err){
                    reject(err);
                    return false;
                }
                resolve(populated);
            });
    });
}

async function listProyectosEstudiante(idUsuario){

    return new Promise((resolve, reject)=>{
        let filter = {

                idUsuario : idUsuario,
          
        };
        let proyectos = [];
        
        Model2.find(filter)
            .exec((err, populated)=>{
                if(err){
                    reject(err);
                    return false;
                }
                    for (let i = 0; i<populated.length; i++) { 

                        let filter2 = {
                            _id : populated[i].idProyecto,
                    };
                   
                      Model.find(filter2)
                            .exec((err, populated2)=>{
                                if(err){
                                    return false;
                                }
                                proyectos.push(populated2[0]);
                                console.log(i, 'popu', populated.length)
                                if((i+1)==populated.length){
                                    
                                    resolve(proyectos)
                                }
                            });
                    }
            });
       
    });
}



function getProyecto(idProyecto){

    return new Promise((resolve, reject)=>{

        if(idProyecto){
            filter = {
                proyectos : idProyecto,
            }
        }
        const p = Model.findById(idProyecto)
        if(!p){
            reject(p);
            return false;
        }
        resolve(p);
})
}

async function eliminarProyecto(idProyecto){
    console.log('el id en eliminar es ',idProyecto)
    filter = {
        _id : idProyecto,
    }
    Model2.deleteMany(filter);
    return Model.deleteOne(filter);
    
}

module.exports = {
    listProyectos,
    getProyecto,
    eliminarProyecto,
    listProyectosProfesor,
    listProyectosEstudiante,
}