// Invoke 'strict' JavaScript mode
'use strict';
// Create the 'example' controller
angular.module('gameBoard').controller('GameBoardController', ['$scope', '$interval', '$location', 'GameBoardService', 'UsersService',
    function($scope, $interval, $location, GameBoardService, UsersService) {
        // Expose the authentication service
        $scope.checkAuth = function() {
            $scope.authentication = {};
            UsersService.checkAuthenticated({
                action: 'checkAuthenticated'
            }, function(response) {
                $scope.authentication.user = response.fullName;
            }, function(errorResponse) {
                if (authentication.user) {
                    delete $scope.authentication.user;
                }
            });
            gotoAnchor('main-screen');
        }
        var gotoAnchor = function(tagId) {
            document.getElementById(tagId).scrollIntoView();
        }
        $scope.currentPicture = {};
        var indexPicture = [];
        var currentIndex = 0;
        $scope.pausing = false;
        $scope.seconds = 0;
        $scope.score = 0;
        $scope.triedTime = 0;
        var count = 0;
        var createIndexArray = function() {
            for (var i = 0; i <= 100; i++) {
                indexPicture[i] = i;
            }
            currentIndex = 0;
            shuffle(indexPicture);
        }
        $scope.startGame = function() {
            loadPicture();
            createIndexArray();
            $scope.triedTime = 0;
            $scope.score = 0;
            $scope.seconds = 0;
            startCount();
            gotoAnchor('main-screen');
        }
        $scope.pauseGame = function() {
            $scope.pausing = true;
            stopCount();
            gotoAnchor('game-result');
        }
        $scope.resumeGame = function() {
            $scope.pausing = false;
            startCount();
            gotoAnchor('main-screen');
        }
        $scope.finishGame = function() {
            stopCount();
            gotoAnchor('game-result');
        }
        $scope.loadTutorial = function(){

            gotoAnchor('tutorial');
        }

        function shuffle(array) {
            var j, x, i;
            for (i = array.length; i; i -= 1) {
                j = Math.floor(Math.random() * i);
                x = array[i - 1];
                array[i - 1] = array[j];
                array[j] = x;
            }
        }
        var startCount = function() {
            count = $interval(function() {
                $scope.seconds++;
            }, 100);
        };
        var stopCount = function() {
            $interval.cancel(count);
            count = undefined;
        };
        var loadPicture = function() {
            GameBoardService.getAll({
                action: 'getAll'
            }, null, function(arrayResponse) {
                $scope.arrayPicture = arrayResponse.slice(0);
                $scope.listPicture = [];
                $scope.currentPicture = $scope.arrayPicture[indexPicture[currentIndex]];
                while (arrayResponse.length) {
                    $scope.listPicture.push(arrayResponse.splice(0, 10));
                }
            }, function(errorResponse) {
                console.log(errorResponse)
            });
        };
        $scope.saveNewPicture = function() {
            var newPicture = {
                label: $scope.label,
                index: $scope.index,
                url: $scope.url
            };
            GameBoardService.saveModified({
                action: 'saveModified'
            }, newPicture, function(response) {
                $scope.listPicture.push(newPicture);
            }, function(errorResponse) {
                console.log(errorResponse);
            });
        };
        $scope.listAllPicture = function() {
            GameBoardService.getAll({
                action: 'getAll'
            }, null, function(response) {
                $scope.listPicture = response;
            }, function(errorResponse) {
                console.log(errorResponse);
            });
        };
        var addScore = function() {
            if ($scope.triedTime == 0) {
                $scope.score += 1;
            } else if ($scope.triedTime == 1) {
                $scope.score += 0.5;
            } else if ($scope.triedTime == 2) {
                $scope.score += 0.25;
            }
        }
        var loadNextPicture = function() {
            currentIndex++;
            if (currentIndex < 100) {
                $scope.currentPicture = $scope.arrayPicture[indexPicture[currentIndex]];
                $scope.triedTime = 0;
            } else {
                finishGame();
            }
        }
        $scope.numberSelect = function($event) {
            var number = $event.currentTarget.children[0].getAttribute('name');
            if (number == indexPicture[currentIndex]) {
                var imageChanging = document.createElement("img");
                imageChanging.setAttribute("src", "http://localhost:3000/img/" + $scope.currentPicture.url);
                imageChanging.height = 42;
                imageChanging.width = 42;
                $event.currentTarget.children[0].style.display = 'none';
                $event.currentTarget.appendChild(imageChanging);
                addScore();
                loadNextPicture();
            } else {
                $scope.triedTime++;
                if ($scope.triedTime == 3) {
                    loadNextPicture();
                }
            }
        }
    }
]);