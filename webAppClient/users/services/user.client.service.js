'use strict';

angular.module('users').factory('UsersService', 
	['$resource',
	 function($resource) {
	// Use the '$resource' service to return an article '$resource' object
    return $resource('api/users/:action', 
    	null,
    	{
        signin: {
            method: 'POST'
        },
        signup: {
            method: 'POST'
        },
        signout : {
            method : 'GET'
        },
        checkAuthenticated: {
            method: 'GET'
        },
        saveNewResult: {
            method: 'POST'
        },
        getPlayingHistory: {
            method: 'GET'
<<<<<<< HEAD
        },
        getNumberPlayer:{
            method:'GET'
=======
>>>>>>> fc14cc390e97d3e7a0d1479509a81833a81f53ab
        }
    });
}]);