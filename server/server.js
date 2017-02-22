require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Usuario} = require('./models/user');

var app = express();
const port = process.env.PORT;
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

app.get('/todos', (request, response) => {
	Todo.find().then((todos) => {
		response.send({todos});
	}, (error) => {
		response.status(400).send(error);
	});
});

app.get('/todos/:id', (request, response) => {
	//Se obtiene el  id de la url.
	var id = request.params.id;

	//Si el id no es válido
	if(!ObjectID.isValid(id)) {
		//Se regresa un 400 del servidor.
		return response.status(400).send();
	}

	Todo.findById(id).then((todo) => {
		if(!todo) {
			return response.status(404).send();
		}

			response.send({todo});
		}).catch((error) => {
			response.status(400).send();
		});


});

app.delete('/todos/:id', (request, response) => {
	var id = request.params.id;

	if(!ObjectID.isValid(id)) {
		return response.status(404).send();
	}

	Todo.findByIdAndRemove(id).then((todo) => {
		if(!todo) {
			return response.status(404).send();
		}

		response.send({todo});
	}).catch((error) => {
		response.status(400).send();
	});
});

app.patch('/todos/:id', (request, response) => {
	var id = request.params.id;
	var body = _.pick(request.body, ['text', 'completed']);

	if(!ObjectID.isValid(id)) {
		return response.status(404).send();
	}

	if(_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if(!todo) {
			return response.status(404).send();
		}

		response.send({todo});
	}).catch((error) => {
		response.status(400).send();
	})
});

app.listen(port, () => {
	console.log(`Servidor iniciado en el puerto ${port}`);
});

module.exports = {
	app: app
}
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
