//Se importa la libreria de Mongodb para conectarse a la base de datos.
//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
//Se crea una instancia nueva de ObjectID
//var obj = new ObjectID();
//console.log(obj);



//Se realiza la conexion a la base de datos.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('No se puede conectar al servidor de MongoDB');
	}

	console.log('Conectado al servidor de MongoDB');

	/*
	db.collection('Todos').find({
		_id: new ObjectID('58a76c9d7e13934d48ede227')
	}).toArray().then((documentos) => {
		console.log('Todos');
		console.log(JSON.stringify(documentos, undefined, 2));
	}, (err) => {
		console.log('Error al consultar los documentos', err);
	});
	*/

	/*
	db.collection('Todos').find().count().then((count) => {
		console.log(`Todos cantidad: ${count}`);
	}, (err) => {
		console.log('Error al consultar los documentos', err);
	});	
	*/

	db.collection('Usuarios').find({nombre: 'Diego'}).toArray().then((documentos) => {
		console.log(JSON.stringify(documentos, undefined, 2));
	})

	//db.close();
});