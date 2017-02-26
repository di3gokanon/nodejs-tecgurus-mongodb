const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {Usuario} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);


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
	});

	describe('PATCH /todos/:id', () => {
		it('Debería de actualizar el objeto', (done) => {
			var hexId = todos[0]._id.toHexString();
			var text = 'Probando actualización de objetos';

			request(app)
			.patch(`/todos/${hexId}`)
			.send({
				completed: true,
				text
			}).expect(200)
			.expect((response) => {
				expect(response.body.todo.text).toBe(text);
				expect(response.body.todo.completed).toBe(true);
				expect(response.body.todo.completedAt).toBeA('number');

			}).end(done);
		});

		it('Debería limpiar la variable completedAt cuando el objeto no este completado', (done) => {
			var hexId = todos[1]._id.toHexString();
			var text = 'Probando actualización limpiando la variable completedAt';

			request(app)	
			.patch(`/todos/${hexId}`)
			.send({
				completed: false,
				text
			}).expect(200)
			.expect((response) => {
				expect(response.body.todo.text).toBe(text);
				expect(response.body.todo.completed).toBe(false);
				expect(response.body.todo.completedAt).toNotExist();

			}).end(done);
		});
	});

	describe('GET /users/me', () => {
		it('Debería regresar un usuario si está autentificado', (done) => {
			request(app)
			.get('/users/me')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.expect((resultado) => {
				expect(resultado.body._id).toBe(users[0]._id.toHexString());
				expect(resultado.body.email).toBe(users[0].email);				
			})
			.end(done);
		});

		it('Debería regresar un estado 401 si no está autentificado', (done) => {
			request(app)
			.get('/users/me')
			.expect(401)
			.expect((res) => {
				expect(res.body).toEqual({});
			})
			.end(done);
		});		
	});

	describe('POST /users', () => {
		it('Debe de crearse un usuario', (done) => {
			var email = 'bguerrero@tecgurus.net';
			var password = '123acb!';

			request(app)
			.post('/users')
			.send({email, password})
			.expect(200)
			.expect((res) => {
				expect(res.headers['x-auth']).toExist();
				expect(res.body._id).toExist();
				expect(res.body.email).toBe(email);
			})
			.end((err) => {
				if(err) {
					return done(err);
				}

				Usuario.findOne({email}).then((user) => {
					expect(user).toExist();
					expect(user.password).toNotBe(password);
					done();
				});
			});
		});

		it('Debería de regresar errores de validación si la petición es inválida', (done) => {
			request(app)
			.post('/users')
			.send({
				email: 'and',
				password: '123'
			})
			.expect(400)
			.end(done);
		});	

		it('No debería de crear un usuario si el email está repetido', (done) => {
			request(app)
			.post('/users')
			.send({
				email: users[0].email,
				password: 'Password123'
			})
			.expect(400)
			.end(done);
		});					
	});