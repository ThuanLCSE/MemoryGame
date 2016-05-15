// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'users' module routes
angular.module('users').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/signup', {
			templateUrl: 'users/views/signup.client.html'
		}).
		when('/signin', {
			templateUrl: 'users/views/signin.client.html'
		});
	}
]); 