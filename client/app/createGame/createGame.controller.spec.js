'use strict';

describe('Controller: CreateGameCtrl', function () {

  // load the controller's module
  beforeEach(module('tictactoeApp'));

  var CreateGameCtrl, scope, httpBackend, location;

  beforeEach(function () {
    module(function ($provide) {
      $provide.value("guid", function () {
        return "12345"
      });
    });

  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $location) {
    httpBackend = $httpBackend;
    location = $location;
    scope = $rootScope.$new();
    CreateGameCtrl = $controller('CreateGameCtrl', {
      $scope: scope
    });
  }));


  it('should post variables from scope for guid, name and userName and process resulting events, and assign me to X', function () {
    httpBackend.expectPOST('/api/createGame/', {
      id: "12345",
      cmd: "CreateGame",
      user: {
        userName: "Max",
        side: "X"
      },
      name: "TheSecondGame",
      timeStamp: "2014-12-02T11:29:29"
    }).respond([
        {
          id: "12345",
          event: "GameCreated",
          user: {
            userName: "Max",
            side: "X"
          }
        }
      ]
    );

    scope.name = "TheSecondGame";

    scope.userName = "Max";

    scope.createGame();
    httpBackend.flush();

    expect(location.search()['gameId']).toBe('12345');
    expect(location.search()['gameSide']).toBe('X');

  });
});
