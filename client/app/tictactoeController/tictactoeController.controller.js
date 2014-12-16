'use strict';

angular.module('tictactoeApp')
  .controller('TictactoeController', function ($scope, $http, gameState, guid, $location) {

    var thenHandleEvents = function (postPromise) {
      postPromise.then(function (data) {
        $scope.gameState.mutate(data.data);
      })
    };

    $scope.gameState = gameState;



    $scope.$watch(function () {
      return $location.search()['gameSide']
    }, function (value) {
      value && ($scope.gameState.me.side = value);
    });

    $scope.showJoinGame = function () {
      console.debug("$location.search()['joinGame']", $location.search()['joinGame']);
      return !!$location.search()['joinGame'];
    };

    $scope.placeMove = function (coords) {
      var user = $scope.gameState.me;
      thenHandleEvents($http.post('/api/placeMove/', {
          id: $scope.gameState.id,
          cmd: "PlaceMove",
          user: user,
          timeStamp: "2014-12-02T11:29:29",
          move: {
            coordinates: coords,
            side: 'X'
          }
        }
      ));
      $scope.gameState.me = user;
    };

  }).factory('gameState', function () {
    var gameState = {
      me: {},
      created: false,
      board: [["", "", ""], ["", "", ""], ["", "", ""]],
      myTurn: false,
      mutate: function (events) {
        console.debug("Mutating", events);
        var handlers = {
          'GameCreated': function (event, gameState) {
            gameState.created = true;
            gameState.id = event.id;
          },
          'GameJoined': function (event, gameState) {
            gameState.otherPlayer = event.user;
          },
          'MovePlaced': function (event, gameState) {
            var x = event.move.coordinates[0], y = event.move.coordinates[1];
            gameState.board[x][y] = event.move.side;
            gameState.myTurn = event.move.side !== gameState.me.side
          }
        };
        _.each(events, function (ev) {
          handlers[ev.event] && handlers[ev.event](ev, gameState)
        })
      }
    }
    return gameState;
  });
