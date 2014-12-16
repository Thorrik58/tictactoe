'use strict';

angular.module('tictactoeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('createGame', {
        url: '/create',
        templateUrl: 'app/createGame/createGame.html',
        controller: 'CreateGameCtrl'
      });
  });
