// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'articles' service
angular.module('gameBoard').factory('GameBoardService', 
	['$resource', function($resource) {
	// Use the '$resource' service to return an article '$resource' object
    return $resource('api/picture/:action', null, {
        'getAll': {
            method: 'GET',
            isArray: true
        },
        'saveModified': {
        	method: 'POST'
        }
    });
}]);