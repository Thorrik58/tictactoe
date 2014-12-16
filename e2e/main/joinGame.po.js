/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var JoinGamePage = function() {
  this.container = element(by.css('.container'));
  this.userName = this.container.element(by.css('#userName'));
  this.joinGameButton = this.container.element(by.css('#joinGame'));
};

module.exports = new JoinGamePage();
