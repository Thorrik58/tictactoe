'use strict';
console.debug = console.log;

var gameDSL = require('./game.dsl');

describe('Tictactoe game play', function() {
  var page;
  var game;

  beforeEach(function() {
    browser.get('/');
    page = require('./creategame.po');
    game = gameDSL(page);
  });

  it('should accept game name and username and create game', function() {
    game.nameOfGame("Cheese!");
    game.nameOfUser("Jerry!");
    game.createGame();
    game.waitForTictactoePage();
    game.expectGameBoardShowing();
    game.expectFirstCellShowing();
  });
});
