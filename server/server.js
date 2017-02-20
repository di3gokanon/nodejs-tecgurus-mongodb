var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Usuario} = require('./models/user');

var app = express();

//Se manda la información en json.
app.use(bodyParser.json());

app.post('/todos', (request, response) => {
	var todo = new Todo({
		text: request.body.text
	});

	todo.save().then((documento) => {
		response.send(documento);
	}, (error) => {
		response.status(400).send(error);
	});
});

app.listen(3000, () => {
	console.log('Servidor iniciado en el puerto 3000');
});
/* 
var objTodo = new Todo({
	text: 'Cocinando la cena'
});

objTodo.save().then((resultado) => {
	console.log('Objecto guardado exitósamente', resultado);
}, (error) => {
	console.log('Error al guardar el objeto.');
});

*/

/*

var objTodoNuevo = new Todo({
	text: 'Programando en NodeJS'
});

objTodoNuevo.save().then((resultado) => {
	console.log(JSON.stringify(resultado, undefined, 2));
}, (error) => {
	console.log('Error al guardar el objeto nuevo.', error);
});

*/
