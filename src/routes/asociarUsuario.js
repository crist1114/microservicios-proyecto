
const {Router}= require('express');
const res = require('express/lib/response');
const router = Router();
const usr_proyectSchema = require('../models/usuario_proyecto');
const usuario_proyectoController = require('../controllers/proyecto_usuarioController');

/**
 * Registrar un usuario a un proyecto.
 */
router.post('/asociar',(req,res)=>{
    
    const usuario = req.body.id_usuario;
    const id_proyecto = req.body.id_proyecto;
    const liderr = req.body.lider;
    console.log("se agregar ",usuario, ', ', id_proyecto);
    const asociando = {
        idProyecto: id_proyecto,
        idUsuario: usuario,
        lider: liderr,
    }

    const usr_proyect = usr_proyectSchema(asociando)
             // console.log(usr_proyect)
         usr_proyect
                 .save()
                 .then((data)=>{res.json(data)})
                 .catch(err=>{res.json({message:err})}); 
});

/**
 * Dar proyectos de usuario.
 */
router.get('/user/:idUsuario',(req,res)=>{

    const {idUsuario} = req.params;   
    usr_proyectSchema
        .find({idUsuario: idUsuario})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));

});


/**
 * Cambiar proyectos de usuario.
 */
 router.put ('/users/:id',(req,res)=>{
    const {id} = req.params;
    const {id_proyecto,id_usuario} = req.body;
    proyectoSchema
        .updateOne({_id:id},{set:{id_proyecto,id_usuario}})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));

});

module.exports = router; //Exportar modulo para usar en otros archivos. 