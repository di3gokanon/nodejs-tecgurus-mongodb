//Se importan los modulos de mongoose, validator y jwt para la autenticacion por tokens del usuario.
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//Se crea un schema de usuarios con todos los requerimientos necesarios para generar el token.
var UsuarioSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength:1,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} no es un email válido'
		}
	},
	password: {
		type: String,
		require: true,
		minlength: 6,
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

UsuarioSchema.methods.toJSON = function() {
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

UsuarioSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

	user.tokens.push({access, token});

	return user.save().then(() => {
		return token;
	});
};

//Se crea la clase usuario.
var Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = {
	Usuario: Usuario
}