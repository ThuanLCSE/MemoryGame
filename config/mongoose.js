// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var	config = require('./config'),
	mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function() {
	// Use Mongoose to connect to MongoDB
	var db = mongoose.connect(config.db);

	// Load the application models 
	require('../appServer/models/user.server.model');
	require('../appServer/models/picture.server.model');
<<<<<<< HEAD
require('../appServer/models/rank.server.model');
=======

>>>>>>> fc14cc390e97d3e7a0d1479509a81833a81f53ab
	// Return the Mongoose connection instance
	return db;
};