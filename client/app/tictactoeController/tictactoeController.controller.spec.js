'use strict';

describe('Controller: TictactoeControllerCtrl', function () {

  beforeEach(module('tictactoeApp'));

  var TictactoeControllerCtrl, scope, httpBackend, http, location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller, $rootScope, $http, $location) {
    http = $http;
    httpBackend = $injector.get('$httpBackend');
    location = $location;
    location.search('gameId','123');
    location.search('gameSide','X');

    scope = $rootScope.$new();
    TictactoeControllerCtrl = $controller('TictactoeController', {
      $scope: scope
    });
  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  it('should generate join url', function(){
    getHistory();

    expect(scope.joinUrl).toBe('http://server:80/join/123');
  });

  it('should init creator to side X', function(){
    getHistory();

    expect(scope.me.userName).toBe('Creator');
  });

  it('should init joiner to side O', function(){

    location.search('gameSide','O');

    getHistory();

    expect(scope.me.userName).toBe('Joiner');
  });


  function getHistory() {
    httpBackend.expectGET('/api/gameHistory/123').respond([{
      event: "GameCreated",
      name: "Game Number one",
      id: "123",
      user: {
        userName: "Creator"
      }
    },{
      event: "GameJoined",
      name: "Game Number one",
      id: "123",
      user: {
        userName: "Joiner"
      }
    }]);
    httpBackend.flush();
  }

  it('should post side from current user', function () {
    getHistory();
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

    scope.me = {userName: "Max", side: 'X'};
    scope.gameState.id = "87687";

    scope.placeMove([2, 0]);
    httpBackend.flush();

    expect(scope.myTurn()).toBe(false);

  });

  it('should post side from current user', function () {
    location.search('gameSide','O');

    getHistory();
    httpBackend.expectPOST('/api/placeMove/', {
      id: "87687",
      cmd: "PlaceMove",
      user: {
        userName: "Max",
        side: "O"
      },
      timeStamp: "2014-12-02T11:29:29",
      move: {
        coordinates: [2, 1],
        side: 'O'
      }
    }).respond([
      {
        event: "MovePlaced",
        user: {
          userName: "Max"
        },
        timeStamp: "2014-12-02T11:29:29",
        move: {
          coordinates: [2, 1],
          side: 'O'
        }
      }
    ]);

    scope.gameId = "123";
    scope.name = "TheSecondGame";

    scope.me = {userName: "Max", side: 'O'};
    scope.gameState.id = "87687";

    scope.placeMove([2, 1]);
    httpBackend.flush();

    expect(scope.myTurn()).toBe(false);

  });
});
