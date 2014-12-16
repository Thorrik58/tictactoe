'use strict';

angular.module('tictactoeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider.state('join', {
      url: "/join/:gameId",
      templateUrl:"/app/joinGame/joinGame.html"
    }).state('create', {
      url:"/",
      templateUrl:"/app/createGame/createGame.html"
    }).state('tictactoe', {
      url:"/tictactoe",
      templateUrl:"/app/tictactoeController/tictactoe.html"
    });
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  }).value('guid', function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    function calculate() {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    };
    console.debug("guid", calculate());
    return calculate();
  });
