'use strict';

describe('Factory: TictacToeState', function () {

  var gameState;
  // load the controller's module
  beforeEach(module('tictactoeApp'));


  // Initialize the controller and a mock scope
  beforeEach(inject(function (_gameState_) {
    gameState = _gameState_;
  }));

  afterEach(function () {
  });

  it('Should add other player to game state when gameJoined', function () {
    gameState.mutate( [{
        event: "GameJoined",
        user: {
          userName: "Max",
          side:"O"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
      }]
    );

    expect(gameState.otherPlayer.userName).toBe("Max");
  });

  it('Should store game id from game created in game state.', function () {
    gameState.mutate( [{
        event: "GameCreated",
        id: "95837",
        user: {
          userName: "Max",
          side:"O"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
      }]
    );

    expect(gameState.id).toBe("95837");
  });

  it('Should add moves 1,1 to game board', function(){

    gameState.mutate( [{
        event: "MovePlaced",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29",
        move: {
          coordinates: [1,1],
          side: 'X'
        }
      }]
    );

    expect(gameState.board[1][1]).toBe("X");

  });

  it('Should add move 2,2 to board.', function(){

    gameState.mutate( [{
        event: "MovePlaced",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29",
        move: {
          coordinates: [2,2],
          side: 'X'
        }
      }]
    );

    expect(gameState.board[2][2]).toBe("X");

  });

  it('Should mark myTurn true if last event was from other side.',function(){
    gameState.me = {side:'O'};
    gameState.mutate( [{
        event: "MovePlaced",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29",
        move: {
          coordinates: [2,2],
          side: 'X'
        }
      }]
    );

    expect(gameState.myTurn).toBe(true);
  });

  it('Should mark myTurn false if last event was from my side.',function(){
    gameState.me = {side:'X'};
    gameState.mutate( [{
        event: "MovePlaced",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29",
        move: {
          coordinates: [2,2],
          side: 'X'
        }
      }]
    );

    expect(gameState.myTurn).toBe(false);
  });
});
