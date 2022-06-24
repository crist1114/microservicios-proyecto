const usr_proyectSchema = require('../models/usuario_proyecto');
const Model = require('../models/usuario_proyecto');

async function asociar(usuarios, id_proyecto, res){

    if(usuarios){

        
       
//         for(let i = 0; i<usuarios.length; i++){
//  //  console.log('entré al for');
//              const asociar = {
//                  idProyecto: id_proyecto,
//                  idUsuario: usuarios[i],
//              }
 
//              console.log('se va a asociar ',asociar);
 
//              await asociarAs(asociar, res);
//          }
     
     }
     else{
         console.log('no hay usuarios');
     }
}

function listEstudiantesProyectos(idProyecto){

    return new Promise((resolve, reject)=>{
        let filter = {idProyecto: idProyecto};

        console.log('entro')
        Model.find(filter)
            .exec((err, populated)=>{
                if(err){
                    reject(err);
                    return false;
                }
                console.log(populated)
                resolve(populated);
            });
    });
}

function getLiderProyecto(idProyecto){

    return new Promise((resolve, reject)=>{
        let filter = {idProyecto: idProyecto};

        //devuelve todos los proyectos
        Model.find(filter)
            .exec((err, populated)=>{
                if(err){
                    reject(err);
                    return false;
                }
                let proyecto_usuarioLider = {};
                populated.forEach(proyecto =>{
                    if(proyecto.lider)
                        proyecto_usuarioLider = proyecto;
                })
                resolve(proyecto_usuarioLider);
            });
    });
}

function asociarAs(aso, res){

        const usr_proyect = usr_proyectSchema(aso)
             // console.log(usr_proyect)
            return  usr_proyect
                 .save()
                 .then((data)=>{res.json(data)})
                 .catch(err=>{res.json({message:err})}); 
}


module.exports = {
    asociar,
    listEstudiantesProyectos,
    getLiderProyecto,
}