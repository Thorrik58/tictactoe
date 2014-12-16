'use strict';

angular.module('tictactoeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('joinGame', {
        url: '/joinGame',
        templateUrl: 'app/joinGame/joinGame.html',
        controller: 'JoinGameCtrl'
      });
  });
