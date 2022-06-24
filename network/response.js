/*
    Modulo que se encargará de responder a las peticiones
*/ 

exports.success = function(req, res, mensajeMandar, status){

    res.status(status).send(
         mensajeMandar,
    );
}

exports.error = function(req, res, mensajeMandar, status, detalles){

    //para saber de donde viene el error se puede usar
    console.error('[response error] '+detalles);
    
    res.status(status).send({
        error : mensajeMandar,
        body: "",
    });
}