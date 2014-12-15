var should = require('should');
var _ = require('lodash');

describe('tictactoe game context using stub', function() {
  it('should route command to instantiated tictactoe game with event stream from storage', function()
  {
    var eventStub = {
      loadEvents: function(modelId){
        return[];
      }
    };

    var execCmd = {};
    var tictactoe = function(history){
      return{
        executeCommand : function(cmd){
          executeCommand = cmd;
          return [];
        }
      }
    };

    var cmdHandler = [tictactoe];

    var gameContext = require('./boundedContext')(eventStub, cmdHandler);

    var testCmd = {
      id: "123"
    };

    var events = gameContext.handleCmd(testCmd);
    should(executeCommand.id).be.exactly("123")
    should(events.length).be.exactly(0);
  })
})
