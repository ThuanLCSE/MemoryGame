// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var picture = require('../../appServer/controllers/picture.server.controller');
// Define the routes module' method
module.exports = function(app) {
	// Set up the 'articles' base routes 
	app.route('/api/picture/getAll')
	   .get(picture.getAll);
	app.route('/api/picture/saveModified')
		.post(picture.saveModified);
};