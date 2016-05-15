// Invoke 'strict' JavaScript mode
'use strict';
// Set the main application name
var mainApplicationModuleName = 'mean';
// Create the main application
var mainApplicationModule = angular.module(mainApplicationModuleName, 
<<<<<<< HEAD
	['ngResource', 'ngRoute', 'users', 'gameBoard','rank']);
=======
	['ngResource', 'ngRoute', 'users', 'example', 'articles', 'gameBoard']);
>>>>>>> fc14cc390e97d3e7a0d1479509a81833a81f53ab
// Configure the hashbang URLs using the $locationProvider services 
mainApplicationModule.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
// Fix Facebook's OAuth bug
if (window.location.hash === '#_=_') window.location.hash = '#!';
// Manually bootstrap the AngularJS application
angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);
});