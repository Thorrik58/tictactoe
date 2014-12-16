'use strict';

angular.module('tictactoeApp')
  .controller('TictactoeController', function ($scope, $http, gameState, guid, $location, $timeout) {

    var thenHandleEvents = function (postPromise) {
      postPromise.then(function (data) {
        $scope.gameState.mutate(data.data);
      });

      postPromise.then(function(){

        if (mySide() === 'X'){
          $scope.me = $scope.gameState.creatingUser;
        } else {
          $scope.me = $scope.gameState.joiningUser;
        }

        $scope.joinUrl = 'http://' + $location.host() +( $location.port() ? ':' + $location.port() :'') + '/join/' + $scope.gameState.id;

      })
    };

    $scope.gameState = gameState;

    var gameId = $location.search()['gameId'];

    function refresh() {
      thenHandleEvents($http.get('/api/gameHistory/' + gameId));
      $timeout( refresh, 1000);
    }

    refresh();

    function mySide() {
      return $location.search()['gameSide'];
    }

    $scope.myTurn = function () {
      return mySide() === $scope.gameState.nextTurn
    };

    $scope.placeMove = function (coords) {
      if(!$scope.myTurn()){
        console.debug("not my turn, returning. Next turn: ", gameState.nextTurn);
        return;
      }
      thenHandleEvents($http.post('/api/placeMove/', {
          id: $scope.gameState.id,
          cmd: "PlaceMove",
          user: $scope.me,
          timeStamp: "2014-12-02T11:29:29",
          move: {
            coordinates: coords,
            side: mySide()
          }
        }
      ));
    };
  });
