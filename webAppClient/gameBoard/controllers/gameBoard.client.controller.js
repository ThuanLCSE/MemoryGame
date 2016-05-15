// Invoke 'strict' JavaScript mode
'use strict';
// Create the 'example' controller
angular.module('gameBoard').controller('GameBoardController', ['$scope', '$rootScope', '$interval', '$location', '$compile', 'GameBoardService', 'UsersService', 'RankingService',
    function($scope, $rootScope, $interval, $location, $compile, GameBoardService, UsersService, RankingService) {
        // Expose the authentication service
        $scope.globalData = {};
        $scope.globalData.critical = 'day';
        $scope.globalData.reverse = true;
        $scope.globalData.userHistory = [];
        $scope.currentPicture = {};
        var indexPicture = [];
        var currentIndex = 0;
        $scope.showText = false;
        $scope.running = false;
        $scope.pausing = false;
        $scope.seconds = 0;
        $scope.score = 0;
        var trueAll = true;
        $scope.triedTime = 0;
        var count = 0;
        $scope.checkSession = function() {
            UsersService.checkAuthenticated({
                action: 'checkAuthenticated'
            }, function(response) {
                $scope.globalData.userFullName = response.fullName;
                gotoAnchor('main-screen');
                getNumberOfPlayer();
            }, function(errorResponse) {
                if ($scope.globalData.userFullName) {
                    delete $scope.globalData.userFullName;
                }
                $location.path('/signin');
            });
        }
        var gotoAnchor = function(tagId) {
            document.getElementById(tagId).scrollIntoView();
        }
        $scope.arrayNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        $scope.initNumber = function(ids) {
            return function(item) {
                var number = $scope.arrayNumber;
                return number.indexOf(item.id) !== -1;
            }
        }
        var initBoard = function(board) {
            for (var i = 0; i < 10; i++) {
                var tr = document.createElement('tr');
                for (var j = 0; j < 10; j++) {
                    var td = document.createElement('td');
                    td.setAttribute("class", "td-icon");
                    td.setAttribute("ng-click", "numberSelect($event)");
                    var divNumb = document.createElement("div");
                    divNumb.setAttribute("name", i * 10 + j);
                    divNumb.setAttribute("class", "num-icon");
                    var textNumber = i * 10 + j;
                    divNumb.appendChild(document.createTextNode(textNumber < 10 ? '0' + textNumber : textNumber));
                    td.appendChild(divNumb);
                    var bindTd = $compile(td)($scope);
                    angular.element(tr).append(bindTd);
                }
                board.appendChild(tr);
            }
        }
        var deleteBoard = function(board) {
            while (board.hasChildNodes()) {
                board.removeChild(board.lastChild);
            }
        }
        $scope.viewRank = function() {
            gotoAnchor('ranking');
        }
        $scope.resetBoard = function() {
            var board = document.getElementById('board');
            deleteBoard(board);
            initBoard(board);
            gotoAnchor('main-screen');
        }
        var createIndexArray = function() {
            for (var i = 0; i <= 100; i++) {
                indexPicture[i] = i;
            }
            currentIndex = 0;
            shuffle(indexPicture);
        }
        $scope.startGame = function(mode) {
            if (mode == 'hard') {
                $scope.showText = false;
            } else {
                $scope.showText = true;
            }
            loadPicture();
            createIndexArray();
            trueAll = true;
            $scope.triedTime = 0;
            $scope.score = 0;
            $scope.seconds = 0;
            $scope.resetBoard();
            startCount();
            gotoAnchor('main-screen');
        }
        $scope.pauseGame = function() {
            $scope.pausing = true;
            stopCount();
            gotoAnchor('game-result');
        }
        $scope.resumeGame = function() {
            $scope.showingTut = false;
            startCount();
            gotoAnchor('main-screen');
        }
        var updateUserNewRankingScore = function() {
            var newScore = {
                fullName: $scope.globalData.userFullName,
                time: $scope.seconds,
                score: $scope.score,
                day: new Date()
            };
            RankingService.updateNewScore({
                action: 'updateNewScore'
            }, newScore, function(response) {
                console.log('Update new');
            }, function(errorResponse) {
                console.log(errorResponse)
            });
        }
        var addUserNewRankingScore = function() {
            var newScore = {
                fullName: $scope.globalData.userFullName,
                time: $scope.seconds,
                score: $scope.score,
                day: new Date()
            };
            RankingService.saveNewScore({
                action: 'saveNewScore'
            }, newScore, function(response) {
                console.log('Congrats');
            }, function(errorResponse) {
                console.log(errorResponse)
            });
        }
        var updateRanking = function() {
            for (var i = 0; i < $scope.globalData.rankingBoard.length; i++) {
                if ($scope.globalData.rankingBoard[i].fullName == $scope.globalData.userFullName) {
                    return updateUserNewRankingScore();
                }
            }
            return addUserNewRankingScore();
        }
        $scope.finishGame = function() {
            if (count) {
                stopCount();
                $rootScope.$emit("callSaveNewResult", {});
                //trueAll == true 
                if (true) {
                    updateRanking();
                }
            }
            gotoAnchor('game-result');
        }
        $scope.loadTutorial = function() {
            if (count) {
                $scope.pausing = true;
                stopCount();
            }
            $scope.showingTut = true;
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
            $scope.running = true;
            $scope.showingTut = false;
            $scope.pausing = false;
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
        $scope.numberSelect = function(obj) {
            var number = obj.currentTarget.children[0].getAttribute('name');
            if (number == indexPicture[currentIndex]) {
                var imageChanging = document.createElement("img");
                imageChanging.setAttribute("class", "img-icon");
                imageChanging.setAttribute("src", "../img/" + $scope.currentPicture.url);
                obj.currentTarget.removeChild(obj.currentTarget.children[0]);
                obj.currentTarget.appendChild(imageChanging);
                addScore();
                loadNextPicture();
            } else {
                $scope.triedTime++;
                if ($scope.triedTime == 3) {
                    trueAll = false;
                    loadNextPicture();
                }
            }
        }
        $scope.testFunc = function() {
            console.log('test ok');
        }
        var getNumberOfPlayer = function() {
            UsersService.getNumberPlayer({
                action: 'getNumberPlayer'
            }, null, function(response) {
                $scope.globalData.numberPlayer = response.count;
            }, function(errorResponse) {
                console.log(errorResponse);
            });
        }
    }
]);