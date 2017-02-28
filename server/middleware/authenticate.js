var {Usuario} = require('./../models/user');

//Creando middleware
var authenticate = (req, res, next) => {
	var token = req.header('x-auth');
	
	Usuario.findByToken(token).then((user) => {
		console.log(user);
		if(!user) {
			return Promise.reject();
		}

		req.user = user;
		req.token = token;
		next();
	}).catch((e) => {
		res.status(401).send();
		console.log(e);
	});
};

module.exports = {
	authenticate: authenticate
};