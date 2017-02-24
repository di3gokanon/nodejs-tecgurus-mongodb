//Se importa la libreria de crypto-js
const {SHA256} = require('crypto-js');
//Se importa la libreria de jsonwebtoken.
const jwt = require('jsonwebtoken');
//Se importa bcryptjs.
const bcrypt = require('bcryptjs');
//contraseña a encryptar.
var password = '123abc!';

//Se encripta con hash la contraseña.
bcrypt.genSalt(10, (error, salt) => {
	bcrypt.hash(password, salt, (error, hash) => {
		console.log(hash);
	});
});

var hashedPassword = '$2a$10$8lwr99N0Mzc5aOKt9SVNAe42YJkB/dNcUk41ssRzvlSCwyI07ekrG';

bcrypt.compare(password, hashedPassword, (error, result) => {
	console.log(result);
});

/*

//Id a codificar con HASH SHA256
var data = {
	id: 10
};

//CODIFICANDO CON JSON WEB TOKEN
var token = jwt.sign(data, '123abc');
console.log(token);	

var decoded	= jwt.verify(token, '123abc');
console.log('Decodificado: ', decoded);

*/

// ==========================================================

//CODIFICANDO CON HASH PURO

/*
var message = 'Usuario con seguridad hash';
var hash = SHA256(message).toString();

console.log(`Mensaje: ${message}`);
console.log(`HASH: ${hash}`);

var data = {
	id: 4
};

var token = {
	data: data,
	hash: SHA256(JSON.stringify(data) + 'encriptada').toString()
}

/*
token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();


var resultadoHASH = SHA256(JSON.stringify(token.data) + 'encriptada').toString();

if (resultadoHASH == token.hash) {
	console.log('Los datos no fueron cambiados');
} else {
	console.log('Los datos fueron cambiados. Ten cuidado');
}

*/