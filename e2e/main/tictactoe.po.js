/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var _ = require('lodash');

var TictactoePage = function() {
  this.container = element(by.css('.container'));
  this.board = this.container.element(by.css('.board'));
  this.joinLink = this.container.element(by.css('#joinlink'));
  this.winner = this.container.element(by.css('.winner'));

  this.opponentname = this.container.element(by.css('#opponentname'));
  this.myname = this.container.element(by.css('#myname'));

  this.x0y0 = this.board.element(by.css('.x0y0'));
  this.x0y1 = this.board.element(by.css('.x0y1'));
  this.x0y2 = this.board.element(by.css('.x0y2'));

  this.x1y0 = this.board.element(by.css('.x1y0'));
  this.x1y1 = this.board.element(by.css('.x1y1'));
  this.x1y2 = this.board.element(by.css('.x1y2'));

  this.x2y0 = this.board.element(by.css('.x2y0'));
  this.x2y1 = this.board.element(by.css('.x2y1'));
  this.x2y2 = this.board.element(by.css('.x2y2'));

};

module.exports = new TictactoePage();
