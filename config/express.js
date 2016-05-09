// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config'),
	http = require('http'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session');

// Define the Express configuration method
module.exports = function(db) {
	// Create a new Express application instance
	var app = express();
	
	// Create a new HTTP server
    var server = http.createServer(app);
	app.use(morgan('dev'));

	// Use the 'body-parser' and 'method-override' middleware functions
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Configure the 'session' middleware
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	// Set the application view engine and 'views' folder
	app.set('views', './appServer/views');
	app.set('view engine', 'ejs');

	// Load the routing files
	require('../appServer/routes/index.server.routes.js')(app);
	require('../appServer/routes/users.server.routes.js')(app);
	require('../appServer/routes/picture.server.routes.js')(app);

	// Configure static file serving
	app.use(express.static('./webAppClient'));

	// Return the Server instance
	return server;
};