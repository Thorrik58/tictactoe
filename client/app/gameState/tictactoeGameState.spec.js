'use strict';
var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('Factory: TictacToeState', function () {

  var gameState;
  // load the controller's module
  beforeEach(module('tictactoeApp'));


  // Initialize the controller and a mock scope
  beforeEach(inject(function (_gameState_) {
    gameState = _gameState_();
  }));

  afterEach(function () {
  });

  it('Should add other player to game state when gameJoined', function () {
    gameState.mutate([{
        event: "GameJoined",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
      }]
    );

    expect(gameState.joiningUser.userName).toBe("Max");
  });

  it('Should store game id and name from game created in game state.', function () {
    gameState.mutate([{
        event: "GameCreated",
        id: "198299",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
      }]
    );

    expect(gameState.id).toBe("198299");
    expect(gameState.name).toBe("TheFirstGame");
    expect(gameState.creatingUser.userName).toBe("Max");
  });

  it('Should add moves 0,1 to game board', function () {

    gameState.mutate([{
        event: "MovePlaced",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29",
        move: {
          coordinates: [0, 1],
          side: 'X'
        }
      }]
    );

    expect(gameState.board[0][1]).toBe("X");

  });

  it('Should add move 2,2 to board.', function () {

    gameState.mutate([{
        event: "MovePlaced",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29",
        move: {
          coordinates: [2, 2],
          side: 'X'
        }
      }]
    );

    expect(gameState.board[2][2]).toBe("X");

  });

  it('Should mark nextTurn as opposite from last event.', function () {
    gameState.me = {side: 'O'};
    gameState.mutate([{
        event: "MovePlaced",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29",
        move: {
          coordinates: [2, 2],
          side: 'X'
        }
      }]
    );

    expect(gameState.nextTurn).toBe('O');
  });

  it('Nextturn should default to X', function () {
    gameState.me = {side: 'X'};
    gameState.mutate([{
        event: "GameCreated",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
      }]
    );

    expect(gameState.nextTurn).toBe('X');
  });

  it('GameWon should set nextTurn to GameOver',function(){
    gameState.me = {side: 'X'};
    gameState.mutate([{
        event: "GameWon",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
      }]
    );

    expect(gameState.nextTurn).toBe('GameOver');
    expect(gameState.winner.userName).toBe("Max");
  });

  it('GameDraw should set nextTurn to GameOver',function(){
    gameState.me = {side: 'X'};
    gameState.mutate([{
        event: "GameDraw",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
      }]
    );

    expect(gameState.nextTurn).toBe('GameOver');
    expect(gameState.gameDraw).toBe(true);
  });
});
