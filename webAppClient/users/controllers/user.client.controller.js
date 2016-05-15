'use strict';
angular.module('users').controller('UsersController', ['$scope', '$rootScope', '$routeParams', '$location', 'UsersService',
    function($scope, $rootScope, $routeParams, $location, UsersService) {
        $rootScope.$on("callSaveNewResult", function() {
            $scope.saveNewResult();
        });
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
                }
                if (response.message) {
                    $scope.error = response.message;
                }
            }, function(errorResponse) {
                $scope.error = "Error occured while sign in";
            });
        };
        $scope.signout = function() {
            UsersService.signout({
                action: 'signout'
            }, null, function(response) {
                $location.path('/signin');
            }, function(errorResponse) {
                console.log(errorResponse);
            });
        };
        $scope.signup = function() {
            if ($scope.signupForm.$valid) {
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
                    if (!$scope.globalData) {
                        $scope.globalData = {};
                    }
                    if (response.fullName) {
                        $scope.globalData.userFullName = response.fullName;
                        $location.path('/');
                    } else {
                        $scope.error = response.message;
                    }
                }, function(errorResponse) {
                    if (errorResponse.data.message.code == 11000) {
                        $scope.error = "Username already exist please replace by another one";
                    } else {
                        $scope.error = "Error occured while sign up";
                    }
                });
            } else {
                $scope.error = "Please fill the form valid!!!"
            }
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
                $scope.globalData.userHistory = response.playingHistory.slice(0);
                $scope.getPlayingHistory();
            }, function(errorResponse) {
                console.log(errorResponse);
            });
        };
        $scope.getPlayingHistory = function() {
            if ($scope.globalData.userFullName) {
                UsersService.getPlayingHistory({
                    action: 'getPlayingHistory'
                }, null, function(response) {
                    $scope.globalData.userHistory = [];
                    for (var i = 0; i < response.playingHistory.length; i++) {
                        response.playingHistory[i].day = new Date(response.playingHistory[i].day);
                        $scope.globalData.userHistory.push(response.playingHistory[i]);
                    }
                }, function(errorResponse) {
                    console.log(errorResponse);
                });
            }
        }
        $scope.order = function(critical) {
            $scope.globalData.critical = critical;
            $scope.globalData.reverse = ($scope.globalData.critical === critical) ? !$scope.globalData.reverse : false;
        }
    }
]);