// Invoke 'strict' JavaScript mode
'use strict';
// Create the 'example' controller
angular.module('rank').controller('RankingController', ['$scope', 'RankingService',
    function($scope, RankingService) {
        $scope.globalData.rankingBoard = [];
        $scope.showRankingBoard = function() {
            RankingService.getAll({
                action: 'getAll'
            }, null, function(rankScore) {
               $scope.globalData.rankingBoard = rankScore.slice(0);
            }, function(errorResponse) {
                console.log(errorResponse)
            });
        }
    }
]);