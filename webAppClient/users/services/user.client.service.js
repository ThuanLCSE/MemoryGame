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
        },
        getNumberPlayer:{
            method:'GET'
        }
    });
}]);