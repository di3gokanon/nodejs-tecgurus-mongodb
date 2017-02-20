const {ObjectID} = require('mongodb');
//Se importa el archivo de mongoose.
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Usuario} = require('./../server/models/user');

var id = '58ab72cfe391c41bbc13ef8f';

if(!ObjectID.isValid(id)) {
	console.log('El id no es válido');
}

/*

Todo.find({
	_id: id
}).then((todos) => {
	console.log('Todos', todos);
});

Todo.findOne({
	_id: id
}).then((todo) => {
	console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
	if(!todo) {
		return console.log('No se encontro el registro.');
	}
	console.log('Todo por Id', todo);
}).catch((error) => {
	console.log(error);
});

*/

// === Busqueda de usuarios ====

Usuario.findById('58a8da051ea9881820a9d737').then((usuarioConsultado) => {
	if (!usuarioConsultado) {
		return console.log('No se encontró el usuario');
	}

	console.log(JSON.stringify(usuarioConsultado, undefined, 2));
}, (error) => {
	console.log(error);
});
