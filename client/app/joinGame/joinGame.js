'use strict';

angular.module('tictactoeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('joinGame', {
        url: '/join/{gameId}',
        templateUrl: 'app/joinGame/joinGame.html',
        controller: 'JoinGameCtrl'
      });
  });
