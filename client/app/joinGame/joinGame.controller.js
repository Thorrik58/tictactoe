'use strict';

angular.module('tictactoeApp')
  .controller('JoinGameCtrl', function ($scope, $http, $location, gameState, $state) {

    var thenHandleEvents = function (postPromise) {
      postPromise.then(function (data) {
        gameState.mutate(data.data);
      })
    };

    $scope.gameState = gameState;
    var gameId = $location.search()['gameId'];

    thenHandleEvents($http.get('/api/gameHistory/' + $state.params.gameId));

    $scope.joinGame = function () {
      var user = {"userName": $scope.userName, side: "O"};
      var joinPostPromise = $http.post('/api/joinGame/', {
          "id": gameState.id,
          "cmd": "JoinGame",
          "user": user,
          "timeStamp": "2014-12-02T11:29:29"
        }
      );
      thenHandleEvents(joinPostPromise);
      joinPostPromise.then(function (response) {
        $location.path('/tictactoe');
        $location.search('gameSide', 'O');
        $location.search('gameId', gameState.id);
      });
    };
  });
