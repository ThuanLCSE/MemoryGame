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
	app.route('/api/users/getNumberPlayer')
	.get(users.getNumberPlayer);
	// Set up the 'signout' route
	app.get('/api/users/signout', users.signout);
};