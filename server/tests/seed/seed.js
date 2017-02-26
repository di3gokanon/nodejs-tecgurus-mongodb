const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {Usuario} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

//Se crea un arreglo de uusarios.
const users = [{
	_id: userOneId,
	email: 'dpaniagua@tecgurus.net',
	password: 'tecgurus',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
	}]
},  {
	_id: userTwoId,
	email: 'gguerrero@tecgurus.net',
	password: 'tecgurus2'
}];

const todos = [{
	_id: new ObjectID(),
	text: 'Primer prueba todo',
}, {
	_id: new ObjectID(),
	text: 'Segunda prueba todo',
	completed: true,
	completedAt: 333
}];

const populateTodos = (done) => {
	Todo.remove({}).then(() => {
		Todo.insertMany(todos);
	}).then(() => {
		done();
	});
};

const populateUsers = (done) => {
	Usuario.remove({}).then(() => {
		var userOne = new Usuario(users[0]).save();
		var userTwo = new Usuario(users[1]).save();

		return Promise.all([userOne, userTwo]);
	}).then(() => done());
}

module.exports = {
	todos : todos, 
	populateTodos : populateTodos,
	users: users,
	populateUsers: populateUsers
}