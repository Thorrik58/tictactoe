'use strict';

var express = require('express');
var controller = require('./thing.controller');

module.exports = function(){
  var router = express.Router();

  router.get('/', controller.index);

  return {
    router:router
  };
}
