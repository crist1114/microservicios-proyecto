require('dotenv').config(); //Manejador de variables de entorno. --> .env
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const registrarRoutes = require('./routes/registrar');
const usr_proyRoutes = require('./routes/asociarUsuario');
const cors = require('cors');


//********** Variables de entorno */
const port = process.env.PORT || 3200; //Puerto de despliegue. 
const uri = process.env.MONGODB_URI; //URI para conexión con MongoDb


//Necesario para poder leer los cuerpos json de las peticiones.
app.use(express.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, 	X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
//options para poder eliminar
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    
    next();
});
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            // Dirección desde donde se pueden hacer peticiones
            if (!["http://localhost:4200"].includes(origin)) {
                return callback(new Error(`La política CORS para el origen ${origin} no permiten el acceso al servidor.`), false);
            }
            return callback(null, true);
        }
    })
);



/**  MIDDLEWARE o ROUTES o ENDPOINTS  */
app.use('/api',registrarRoutes);
app.use('/api',usr_proyRoutes);
/** Inicio del servidor */
app.listen(port,()=>{
    console.log(`Server listen in port ${port}`);
})


/**
 * Conexión con la base de datos.
 */
const conectar = ()=>{
    mongoose.connect(uri)
    .then(()=>{
      console.log('Conected with mongodb atlas')
    })
    .catch(err=>{console.error('Paila: '+ err)})
  }

conectar();//Conectar con DB