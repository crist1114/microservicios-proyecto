require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI; //Variable entorno. 
const client = new MongoClient;

const conectar = async ()=>{
  mongoose.connect(uri,err=>{
    console.log(uri);
  }).then(()=>{
    console.log('Conected with mongodb atlas')
  }).catch(err=>{console.error('Paila: '+ err)})
}


module.exports = conectar;

/* 
client.connect(uri,async (err) => {
    if(err) throw err;
    
   const collection = await client.db("proyectos").collection("proyectos");
  // perform actions on the collection object
  console.log('Db conectada'+collection.collectionName)
  client.close();

}).then(() =>console.log('Db conectada')).catch(err=> console.error('Paila: '+ err));
*/
