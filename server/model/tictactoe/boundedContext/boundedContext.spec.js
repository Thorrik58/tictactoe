var should = require('should');
var _ = require('lodash');

describe('tictactoe game context using stub', function() {
  it('should route command to instantiated tictactoe game with event stream from storage', function()
  {
    var eventStub = {
      loadEvent: function(modelId){
        return[];
      }
    };

    var execCmd = {};
    var ticTacToe = function(history){
      return{
        execCmd : function(cmd){
          execCmd = cmd;
        }
      }
    };

    var cmdHandler = [ticTacToe];

    var gameContext = require('./boundedContext')(eventStub, cmdHandler);

    var testCmd = {
      id: "123"
    };

    gameContext.handleCommand(testCmd);
    should(execCmd.id).be.exactly("123")
  })
})
