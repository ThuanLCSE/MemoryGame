// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'articles' service
angular.module('rank').factory('RankingService', 
	['$resource', function($resource) {
	// Use the '$resource' service to return an article '$resource' object
    return $resource('api/rank/:action', null, {
        'getAll': {
            method: 'GET',
            isArray: true
        },
        'saveNewScore': {
        	method: 'POST'
        },
        'updateNewScore' :{
            method: 'POST'
        }
    });
}]);