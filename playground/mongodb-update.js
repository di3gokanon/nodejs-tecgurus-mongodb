//Se importa la libreria de Mongodb para conectarse a la base de datos.
//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//Se realiza la conexion a la base de datos.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('No se puede conectar al servidor de MongoDB');
	}

	console.log('Conectado al servidor de MongoDB');

	/*
	db.collection('Todos').findOneAndUpdate({
		_id : new ObjectID('58a7762a7e13934d48ede3ed')
	}, {
		$set: {
			completed: true
		}
	}, {
		returnOriginal: false
	}).then((resultados) => {
		console.log(resultados);
	});
	*/


	db.collection('Usuarios').findOneAndUpdate({
		_id : new ObjectID('58a76664e6b2650f68e0c2ac')
	}, {
		$set: {
			nombre: 'Luis Jesús'
		},
		$inc: {
			edad: 50
		}
	}, {
		returnOriginal: false
	}).then((resultados) => {
		console.log(resultados);
	});

});