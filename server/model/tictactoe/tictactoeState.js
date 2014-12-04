/**
 * Created by Thorri on 12/3/14.
 */
var _ = require('lodash');

module.exports = function(history){
  var gameFull = false;
  _.each(history, function(event){
    if(event.event === "GameJoined"){
      gameFull = true;
    }
  });
  return {
    gameFull : function(){
      return gameFull;
    }
  }
};
