/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var CreateGamePage = function() {
  this.container = element(by.css('.container'));
  this.gameName = this.container.element(by.css('#name'));
  this.userName = this.container.element(by.css('#userName'));
  this.createGameButton = this.container.element(by.css('#createGame'));
};

module.exports = new CreateGamePage();
