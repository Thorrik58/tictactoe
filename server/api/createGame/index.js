'use strict';

var express = require('express');

var controller = require('../command.controller.js');


module.exports = function(app){

  var router = express.Router();

  //console.debug('Adding post to router');
  router.post('/', controller.executeCommand);

  return {
    router:router
  }

}
