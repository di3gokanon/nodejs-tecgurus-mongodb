const {ObjectID} = require('mongodb');
//Se importa el archivo de mongoose.
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Usuario} = require('./../server/models/user');

/*
//Funcion para eliminar registros de la base de datos.
Todo.remove({}).then((resultados) => {
	console.log(resultados);
});
*/

Todo.findOneAndRemove({_id: '58acc4e377f19193372c249b'}).then((todo) => {

});

Todo.findByIdAndRemove('58acc4e377f19193372c249b').then((todo) => {
	console.log(todo);
});
