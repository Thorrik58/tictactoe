'use strict';
console.debug = console.log;

var gameDSL = require('./game.originaldsl.js');

describe('Tictactoe game play', function () {
  var createPage;
  var joinPage;

  beforeEach(function () {
    browser.get('/');
    createPage = require('./createGame.po');
    joinPage = require('./joinGame.po');
  });

  function placeMove(cellElement, expected) {
    browser.sleep(1000);
    cellElement.click();
    expect(cellElement.getText()).toBe(expected);
  }

  it('should play to win', function () {
    createPage.gameName.sendKeys("Cheese");
    createPage.userName.sendKeys("Jerry");

    createPage.createGameButton.click();

    var tictactoe = require('./tictactoe.po');

    expect(tictactoe.board).toBeDefined();

    placeMove(tictactoe.x0y0, 'X');

    tictactoe.joinLink.getAttribute('href').then(function (joinHref) {

// handle of first window
      browser.getAllWindowHandles().then(function (handles) {

        var creatorHandle = handles[0];

        var joinerHandle = 'second-window';
        browser.executeScript('window.open("' + joinHref + '", ' + '"' + joinerHandle + '"' + ')');

        // switch to new window
        browser.switchTo().window(joinerHandle);

        joinPage.userName.sendKeys("Tom");
        joinPage.joinGameButton.click();

        browser.driver.wait(function () {
          return browser.driver.isElementPresent(by.css('#gameboard')).then(function (el) {
            return el === true;
          });
        }).then(function () {

          tictactoe.x1y1.click();
          expect(tictactoe.x1y1.getText()).toBe('O');

          expect(tictactoe.myname.getText()).toBe("Tom");

          browser.switchTo().window(creatorHandle).then(function () {
            browser.driver.wait(function () {
              return browser.driver.isElementPresent(by.css('#gameboard')).then(function (el) {
                return el === true;
              });
            }).then(function () {

              expect(tictactoe.myname.getText()).toBe("Jerry");

              placeMove(tictactoe.x1y0, 'X');

              browser.switchTo().window(joinerHandle).then(function () {
                browser.driver.wait(function () {
                  return browser.driver.isElementPresent(by.css('#gameboard')).then(function (el) {
                    return el === true;
                  });
                }).then(function () {

                  expect(tictactoe.myname.getText()).toBe("Tom");

                  placeMove(tictactoe.x1y2, 'O');

                  browser.switchTo().window(creatorHandle).then(function () {
                    browser.driver.wait(function () {
                      return browser.driver.isElementPresent(by.css('#gameboard')).then(function (el) {
                        return el === true;
                      });
                    }).then(function () {

                      expect(tictactoe.myname.getText()).toBe("Jerry");

                      placeMove(tictactoe.x2y0, 'X');

                      browser.sleep(500);

                      expect(tictactoe.winner).toBeDefined();

                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
