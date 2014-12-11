var _ = require('lodash');

module.exports = function(eventStore, commandHandler){
  return {
    handleCommand : function(cmd){
      var eventStream = eventStore.loadEvents(cmd.id);
      _.each(commandHandler, function(handler){
        handler(eventStream).executeCommand(cmd);
      })
    }
  }
}
