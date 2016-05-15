// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'example' module routes
angular.module('gameBoard').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'gameBoard/views/gameBoard.client.view.html'
		}).
		when('/admin', {
			templateUrl: 'gameBoard/views/master.client.view.html'
		});
	}
]); 
