//Se importan los modulos de mongoose, validator y jwt para la autenticacion por tokens del usuario.
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

//Funcion que permite generar un token de autenticación para un usuario.
UsuarioSchema.methods.generateAuthToken = function () {
	//Se define un usuario.
	var user = this;
	//Se indica los permisos de autenticación
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

	user.tokens.push({access, token});

	return user.save().then(() => {
		return token;
	});
};

UsuarioSchema.statics.findByToken = function (token) {
	var Usuario = this;
	var decoded;

	try {
		//Se comprueba si existe el token
		decoded = jwt.verify(token, '');
	} catch(exception) {
		return new Promise((resolve, reject) => {
			reject();
		});
	}

	//Se recupera un usuario existente con el token a consultar.
	return Usuario.findOne({
		_id: decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	})
};

//Se ejecuta la función "pre" del middlaware.
UsuarioSchema.pre('save', function(next) {
	var user = this;

	if(user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

//Se crea la clase usuario.
var Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = {
	Usuario: Usuario
}