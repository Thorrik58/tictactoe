'use strict';
console.debug = console.log;

var gameDSL = require('./game.originaldsl.js');

describe('Tictactoe game play', function() {
  var page;
  var game;

  beforeEach(function() {
    browser.get('/');
    page = require('./creategame.po');
    game = gameDSL(page);
  });

  it('should play one game to win', function(done) {
    game.nameOfGame("Cheese!");
    game.nameOfUser("Jerry!");
    game.createGame();
    game.waitForTictactoePage();
    game.expectGameBoardShowing();
    game.expectFirstCellShowing();

    game.joinWithOtherSide(function(otherside){
      otherside.join("Thorri");

      browser.wait(function () {
        return browser.isElementPresent(by.css('#gameboard')).then(function (el) {
          return el === true;
        });
      }).then(function () {
        otherside.expectGameBoardShowing();
        otherside.expectFirstCellShowing();
        game.placeMove({x:0,y:0},'X');
        otherside.placeMove({x:2,y:1},'O');
        game.placeMove({x:1,y:0},'X');
        otherside.placeMove({x:2,y:1},'O');
        game.placeMove({x:2,y:0},'X');
        game.expectWinner();
        otherside.closeWindow();
        done();
      });
    })

    console.debug("RUN TO END");
  });
});
