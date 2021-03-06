var _ = require('lodash');

module.exports = function(eventStore, cmdHandler){
  return {
    handleCmd : function(cmd){
      var eventStream = eventStore.loadEvents(cmd.id);
      var events= cmdHandler(eventStream).executeCommand(cmd);
      eventStore.storeEvents(cmd.id, events);
      return events;
    }
  }
}
