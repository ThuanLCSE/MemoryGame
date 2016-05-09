// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var users = require('../../appServer/controllers/users.server.controller'),
	articles = require('../../appServer/controllers/articles.server.controller');

// Define the routes module' method
module.exports = function(app) {
	// Set up the 'articles' base routes 
	app.route('/api/articles')
	   .get(articles.list)
	   .post(articles.create);
	
	// Set up the 'articles' parameterized routes
	app.route('/api/articles/:articleId')
	   .get(articles.read)
	   .put(articles.hasAuthorization, articles.update)
	   .delete(articles.hasAuthorization, articles.delete);

	// Set up the 'articleId' parameter middleware   
	app.param('articleId', articles.articleByID);
};