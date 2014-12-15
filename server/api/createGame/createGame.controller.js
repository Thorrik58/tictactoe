'use strict';

var _ = require('lodash');
var boundedContext = require('../../model/tictactoe/boundedContext/boundedContext');
var tictactoeHandler = require('../../model/tictactoe/models/tictactoe');

exports.createGame = function(req, res) {
  console.debug("Creating game");

  var store = {
    loadEvents: function(id){
      console.debug("Loading events for id", id);
      return [];
    }
  }

  var context = boundedContext(store, [tictactoeHandler]);
  var result = context.handleCmd(req.body);
  console.debug("Create game", result, req.body);
  res.json(result);
};
