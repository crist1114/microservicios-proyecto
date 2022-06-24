const {Router}= require('express');
const router = Router();
const proyectoSchema = require('../models/proyecto');
const usr_proyectSchema = require('../models/usuario_proyecto');
const usuario_proyectoController = require('../controllers/proyecto_usuarioController');
const controllerProyecto = require('../controllers/proyectoController.js')
const response = require('../../network/response');
const {nanoid} = require('nanoid');

//Crear un proyecto.
router.post('/crear',(req,res)=>{
    
    const proyecto = proyectoSchema(req.body);
    console.log('el proyecto que llega es ',proyecto)
    proyecto.save()
        .then((data)=>{
            res.json(data)})
        .catch(err =>{res.json({message: err})});
})

router.get('/', (req, res)=>{

    controllerProyecto.listProyectos()
    .then(data => {
        console.log(data)
        response.success(req, res, data, 201);
        }).catch(e=>{
            response.error(req, res, "No existen proyectos", 500, e);
        })
});

router.get('/proyectosUsuario/:id', (req, res)=>{

    controllerProyecto.listProyectosProfesor(req.params.id)
    .then(data => {
        console.log(data)
        response.success(req, res, data, 201);
        }).catch(e=>{
            response.error(req, res, "No existen proyectos", 500, e);
        })
});

router.get('/proyectosEstudiante/:id', (req, res)=>{

    controllerProyecto.listProyectosEstudiante(req.params.id)
    .then(data => {
        console.log(data)
        response.success(req, res, data, 201);
        }).catch(e=>{
            response.error(req, res, "No existen proyectos", 500, e);
        })
});

router.get('/estudiantesProyecto/:idProyecto', (req, res)=>{

    usuario_proyectoController.listEstudiantesProyectos(req.params.idProyecto)
    .then(data => {
        console.log(data)
        response.success(req, res, data, 201);
        }).catch(e=>{
            response.error(req, res, "No existen proyectos", 500, e);
        })
});

router.get('/liderProyecto/:idProyecto', (req, res)=>{

    usuario_proyectoController.getLiderProyecto(req.params.idProyecto)
    .then(data => {
        console.log('el id lider es ',data)
        response.success(req, res, data, 201);
        }).catch(e=>{
            response.error(req, res, "Error de lider", 500, e);
        })
});

router.get('/:id', (req, res)=>{

    controllerProyecto.getProyecto(req.params.id)
    .then(data => {
        response.success(req, res, data, 201);
        }).catch(e=>{
            response.error(req, res, "No existen proyectos", 500, e);
        })
});

router.delete('/eliminar/:id', (req, res)=>{

    controllerProyecto.eliminarProyecto(req.params.id)
    .then(data => {
        response.success(req, res, data, 201);
        }).catch(e=>{
            response.error(req, res, "No existen proyectos", 500, e);
        })
})


module.exports = router;