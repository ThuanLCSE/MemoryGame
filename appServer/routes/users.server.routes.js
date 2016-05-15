// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var users = require('../../appServer/controllers/users.server.controller');

// Define the routes module' method
module.exports = function(app) {
	// Set up the 'signup' routes 
	app.route('/api/users/signup')
	   .post(users.signup);

	// Set up the 'signin' routes 
	app.route('/api/users/signin')
	   .post(users.signin);

	app.route('/api/users/checkAuthenticated')
	.get(users.authenBySession);
	app.route('/api/users/updateResult')
	.post(users.updateResult);
	app.route('/api/users/getPlayingHistory')
	.get(users.getPlayingHistory);
<<<<<<< HEAD
	app.route('/api/users/getNumberPlayer')
	.get(users.getNumberPlayer);
=======
>>>>>>> fc14cc390e97d3e7a0d1479509a81833a81f53ab
	// Set up the 'signout' route
	app.get('/api/users/signout', users.signout);
};