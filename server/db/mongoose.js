var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp'); //Para desarrollo
mongoose.connect(process.env.MONGODB_URI); //Para produccion

module.exports = {
	mongoose: mongoose
}