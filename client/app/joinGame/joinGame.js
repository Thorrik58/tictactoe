'use strict';

angular.module('tictactoeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('joinGame', {
        url: '/join',
        templateUrl: 'app/joinGame/joinGame.html',
        controller: 'JoinGameCtrl'
      });
  });
