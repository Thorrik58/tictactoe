var _ = require('lodash');

module.exports = function(eventStore, cmdHandler){
  return {
    handleCmd : function(cmd){
      var eventStream = eventStore.loadEvents(cmd.id);
      return cmdHandler(eventStream).executeCommand(cmd);
    }
  }
}
