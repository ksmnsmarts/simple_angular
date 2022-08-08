const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongApp = {}; 
mongApp.appSetObjectId = function (app) {
	app.set('ObjectId', mongoose.Types.ObjectId);
	console.log('complete to set mongoose ObjectId');
}

main().catch(err => console.log(err));

async function main() {

	// test-potatocs , potatocs 
	await mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).then( ()=> {
		createSchema();
		console.log('Database Connected');
	});
}

function createSchema() {
	const dbModels = {};
	
    dbModels.Todo = require('../models/todo_schema');
    dbModels.User = require('../models/user_schema');
    dbModels.AggregateTodo = require('../models/aggregateTodo_schema');

	global.DB_MODELS = dbModels;
}

module.exports = mongApp;
