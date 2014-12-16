/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var TictactoePage = function() {
  this.container = element(by.css('.container'));
  this.board = this.container.element(by.css('.board'));
  this.x0y0 = this.board.element(by.css('.x0y0'));
};

module.exports = new TictactoePage();
