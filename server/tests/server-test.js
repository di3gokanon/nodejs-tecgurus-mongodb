const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
	_id: new ObjectID(),
	text: 'Primer prueba todo',
}, {
	_id: new ObjectID(),
	text: 'Segunda prueba todo'
}];

beforeEach((done) => {
	Todo.remove({}).then(() => {
		Todo.insertMany(todos);
	}).then(() => {
		done();
	});
});


	describe('POST /todos', () => {
		it('Debe de crearse un nuevo objeto Todo', (done) => {
			var text = 'Probando el texto de todo';

			request(app).
			post('/todos').
			send({text}).
			expect(200).
			expect((response) => {
				expect(response.body.text).toBe(text);
			}).end((error, response) => {
				if(error) {
					return done(error);
				}

				Todo.find({text}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((error) => done(error));
		});
	});

	it('No debe de crearse un objeto todo con datos inválidos', (done) => {
		request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((error, response) => {
			if(error) {
				return done(error);
			}

			Todo.find().then((todos) => {
				expect(todos.length).toBe(2);
				done();
			}).catch((error) => {
				done(error);
			});
		});
	});
});

	describe('GET /todos', () => {
		it('Debería de obtener todos los objetos', (done)=> {
			request(app).get('/todos').expect(200).expect((response) => {
				expect(response.body.todos.length).toBe(2);
			}).end(done);
		});
	});

	describe('GET /todos/:id', () => {
		it('Debería regresar todo el documento', (done) => {
			request(app).get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200).expect((response) => {
				expect(response.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
		});

		it('Debería de regresar un 404 si no encuentra registros', (done) => {
			var hexId = new ObjectID().toHexString();

			request(app)
			.get(`/todos/${hexId}`)
			.expect(404)
			.end(done);
		});
	});

	describe('DELETE /todos/:id', () => {
		it('Debería de eliminar todos los registros', (done) => {
			var hexId = todos[1]._id.toHexString();

			request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((response) => {
				expect(response.body._id).toBe(hexId);
			})
			.end((error, response) => {
				//Si hay un error.
				if(error) {
					console.log('Error...');
					return done(error);
				}

				Todo.findById(hexId).then((todo) => {
					console.log('Buscando por id...');
					expect(todo).toNotExist();
					done();
				}).catch((error) => done(error));
			});
		});

		

		it('Debería regresar un 404 si no elimina registros', (done) => {
			var hexId = new ObjectID().toHexString();

			request(app)
			.get(`/todos/${hexId}`)
			.expect(404)
			.end(done);
		});

		it('Debería regresar un 4040 si el ObjectID es inválido', (done) => {

		});

		

	})