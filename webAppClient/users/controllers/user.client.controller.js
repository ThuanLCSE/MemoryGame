'use strict';
angular.module('users').controller('UsersController', ['$scope', '$routeParams', '$location', 'UsersService',
    function($scope, $routeParams, $location, UsersService) {
        $scope.userHistory = [];
        $scope.signin = function() {
            var userData = {
                username: $scope.username,
                password: $scope.password,
            };
            UsersService.signin({
                action: 'signin'
            }, {
                user: userData
            }, function(response) {
                if (response.fullName) {
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                }
            }, function(errorResponse) {
                // Otherwise, present the user with the error message
                $scope.error = errorResponse;
            });
        };
        $scope.signup = function() {
            // Use the form fields to create a new article $resource object
            var newUser = {
                fullName: $scope.fullName,
                username: $scope.username,
                password: $scope.password,
                email: $scope.email
            };
            // Use the article '$save' method to send an appropriate POST request
            UsersService.signup({
                action: 'signup'
            }, newUser, function(response) {
                // If an article was created successfully, redirect the user to the article's page 
                $location.path('/');
            }, function(errorResponse) {
                // Otherwise, present the user with the error message
                $scope.error = errorResponse;
            });
        };
        $scope.saveNewResult = function() {
            var newResult = {
                day: new Date(),
                score: $scope.score,
                time: $scope.seconds
            };
            // Use the article '$save' method to send an appropriate POST request
            UsersService.saveNewResult({
                action: 'updateResult'
            }, {
                result: newResult
            }, function(response) {
                $scope.userHistory = response.playingHistory.slice(0);
            }, function(errorResponse) {
                console.log(errorResponse);
            });
        };
        $scope.getPlayingHistory = function() {
            UsersService.getPlayingHistory({
                action: 'getPlayingHistory'
            }, null, function(response) {
                for (var i = 0; i < response.playingHistory.length; i++) {
                    response.playingHistory[i].day = new Date(response.playingHistory[i].day);
                    $scope.userHistory.push(response.playingHistory[i]);
                }
            }, function(errorResponse) {
                console.log(errorResponse);
            });
        }
    }
]);