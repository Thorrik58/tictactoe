'use strict';

var _ = require('lodash');
var boundedContext = require('../model/tictactoe/boundedContext/boundedContext');
var tictactoeHandler = require('../model/tictactoe/models/tictactoe');

var app = require('../app');

exports.executeCommand = function(req, res) {

  try{
    if(!app.eventStore){
      app.eventStore = require('../eventStore/memoryStore')();
    }
    var store = app.eventStore;

    var context = boundedContext(store, tictactoeHandler);

    var result = context.handleCmd(req.body);

    res.json(result);
  }
  catch(e){
    res.json(e)
  }
};
