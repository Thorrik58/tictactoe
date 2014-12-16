'use strict';

describe('Controller: TictactoeControllerCtrl', function () {

  beforeEach(module('tictactoeApp'));

  var TictactoeControllerCtrl, scope, httpBackend, http, location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller, $rootScope, $http, $location) {
    http = $http;
    httpBackend = $injector.get('$httpBackend');
    location = $location;

    scope = $rootScope.$new();
    TictactoeControllerCtrl = $controller('TictactoeController', {
      $scope: scope
    });
  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should post move', function () {
    httpBackend.expectPOST('/api/placeMove/', {
      id: "87687",
      cmd: "PlaceMove",
      user: {
        userName: "Max",
        side: "X"
      },
      timeStamp: "2014-12-02T11:29:29",
      move: {
        coordinates: [2, 0],
        side: 'X'
      }
    }).respond([
      {
        event: "MovePlaced",
        user: {
          userName: "Max"
        },
        timeStamp: "2014-12-02T11:29:29",
        move: {
          coordinates: [2, 0],
          side: 'X'
        }
      }
    ]);

    scope.gameId = "123";
    scope.name = "TheSecondGame";

    scope.gameState.me = {userName: "Max", side: 'X'};
    scope.gameState.id = "87687";

    scope.placeMove([2, 0]);
    httpBackend.flush();

    expect(scope.gameState.myTurn).toBe(false);

  });
});
