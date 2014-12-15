var _ = require('lodash');

module.exports = function(eventStore, cmdHandler){
  return {
    handleCmd : function(cmd){
      var eventStream = eventStore.loadEvents(cmd.id);
      var resultingEvents = [];
      _.each(cmdHandler, function(handler){
        var items = handler(eventStream).executeCommand(cmd);
        console.debug("items",items);
        resultingEvents = resultingEvents.concat(items);
        console.debug("resulting events", resultingEvents);
      });
      return resultingEvents;
    }
  }
}
