module.exports = function (page, gameHandle) {
  var tictactoe;
  var join;
  var gameHandle;

  function nameOfGame(gameName) {
    page.gameName.sendKeys(gameName);
  }

  function nameOfUser(userName) {
    page.userName.sendKeys(userName);
  }

  function createGame() {
    page.createGameButton.click();
  }

  function waitForTictactoePage() {

  }

  function expectGameBoardShowing() {
    console.debug("expect game board showing", gameHandle);
    tictactoe = require('./tictactoe.po');

    expect(tictactoe.board).toBeDefined();
  }


  function expectFirstCellShowing() {
    console.debug("Expect first cell showing ", gameHandle);
    expect(tictactoe.x0y0).toBeDefined();
  }

  function expectWinner(winnerName) {

    console.debug("tictactoe.winner", tictactoe.winner);

    browser.element(by.binding('gameState.winner.userName')).getText().then(function(value){
      console.debug("Winner username ", value);
    });

    expect(tictactoe.winner).toBeDefined();
  }

  function switchToMyWindow(whenSwitched) {
    console.debug("Switching to my window ", gameHandle);
    return browser.switchTo().window(gameHandle);
  }

  function join(userName) {
    switchToMyWindow();
    join = require('./joingame.po');
    join.userName.sendKeys(userName);
    join.joinGameButton.click();
  }

  function placeMove(coordinates, side) {
    console.debug("PLACING MOVE ", side, coordinates, gameHandle);
    switchToMyWindow().then(function(){
      var cell = tictactoe.cells[coordinates.x][coordinates.y];
      cell.click();
      cell.getText().then(function(value){
        console.debug( coordinates, " expected", side, "got", value);
      });
      tictactoe.myname.getText().then(function(value){
        console.debug(coordinates, side, " - myname is ", value);
      });

      expect(cell.getText()).toBe(side);



    });

  }

  function joinWithOtherSide(whenJoined) {
    tictactoe.joinLink.getAttribute('href').then(function (joinHref) {

// handle of first window
      browser.getAllWindowHandles().then(function (handles) {

        gameHandle = handles[0];

        // open new window
        browser.executeScript('window.open("' + joinHref + '", "second-window")');

        // switch to new window
        browser.switchTo().window('second-window');


        whenJoined(module.exports(undefined, "second-window"));
        // do something within context of new window
      });

    });

  }

  function closeWindow() {

    console.debug("Closing window");
    switchToMyWindow();
    browser.executeScript('window.close()');
  }

  return {
    nameOfGame: nameOfGame,
    nameOfUser: nameOfUser,
    createGame: createGame,
    waitForTictactoePage: waitForTictactoePage,
    joinWithOtherSide: joinWithOtherSide,
    join: join,
    placeMove: placeMove,

    expectGameBoardShowing: expectGameBoardShowing,
    expectFirstCellShowing: expectFirstCellShowing,
    expectWinner: expectWinner,

    closeWindow: closeWindow
  }
};
