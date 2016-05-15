// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var rank = require('../../appServer/controllers/rank.server.controller');
// Define the routes module' method
module.exports = function(app) {
	// Set up the 'articles' base routes 
	app.route('/api/rank/getAll')
	   .get(rank.getAll);
	app.route('/api/rank/saveNewScore')
		.post(rank.saveNewScore);
	app.route('/api/rank/updateNewScore')
		.post(rank.updateNewScore);
};