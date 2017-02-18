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
	db.collection('Todos').deleteMany({text: 'Bienvenidos al curso de Node'}).then((resultados) => {
		console.log(resultados);
	});
	*/

	/*
	db.collection('Todos').deleteOne({text: 'TecGurus'}).then((resultados) => {
		console.log(resultados);
	});
	*/

	/*
	db.collection('Todos').findOneAndDelete({completed: false}).then((resultados) => {
		console.log(resultados);
	});
	*/	


});