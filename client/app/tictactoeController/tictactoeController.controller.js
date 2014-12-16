'use strict';

angular.module('tictactoeApp')
  .controller('TictactoeController', function ($scope, $http, gameState, guid, $location) {

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

    thenHandleEvents($http.get('/api/gameHistory/' + gameId));

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

  }).factory('gameState', function () {
    var gameState = {
      created: false,
      board: [["", "", ""], ["", "", ""], ["", "", ""]],
      nextTurn:'X',
      mutate: function (events) {
        var handlers = {
          'GameCreated': function (event, gameState) {
            gameState.created = true;
            gameState.name = event.name;
            gameState.id = event.id;
            gameState.creatingUser = event.user;
          },
          'GameJoined': function (event, gameState) {
            gameState.joiningUser = event.user;
          },
          'MovePlaced': function (event, gameState) {
            var x = event.move.coordinates[0], y = event.move.coordinates[1];
            gameState.board[x][y] = event.move.side;
            gameState.nextTurn = event.move.side === 'X' ? 'Y' : 'X';
          }
        };
        _.each(events, function (ev) {
          handlers[ev.event] && handlers[ev.event](ev, gameState)
        })
      }
    }
    return gameState;
  });
