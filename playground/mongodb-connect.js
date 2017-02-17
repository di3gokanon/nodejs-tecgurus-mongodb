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
	db.collection('Todos').insertOne({
		text: 'Diego Paniagua López',
		completed: false
	}, (err, resultados) => {
		if(err) {
			return console.log('No se pudo guardar todo', err);
		}

		console.log(JSON.stringify(resultados.ops, undefined, 2));
	});
	*/


	/*
	//Guardar un nuevo documento dentro de usuarios.
	db.collection('Usuarios').insertOne({
		nombre: 'Diego',
		edad: 25,
		ubicacion: 'Ciudad de México'
	}, (err, resultados) => {
		if(err) {
			return console.log('Error al guardar el usuario', err);
		}

		console.log(resultados.ops[0]._id.getTimestamp());
	})
	*/

	db.close();
});