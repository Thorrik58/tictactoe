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

    var executedCommand = {};

    var tictactoe = function(history){
      return{
        executeCommand : function(cmd){
          executedCommand = cmd;
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
    should(executedCommand.id).be.exactly("123")
    should(events.length).be.exactly(0);
  })

  it('should route command to instantiated tictactoe game with event stream from store and return generated events, using mock style tests.', function(){

    var jm = require('jsmockito').JsMockito;

    jm.Integration.importTo(global);

    var mockStore = spy({
      loadEvents : function(){
    }
    });

    when(mockStore).loadEvents('123').thenReturn([]);

    var mockTicTacToe = spy({
      executeCommand : function(){
      }
    });

    when(mockTicTacToe).executeCommand().thenReturn([]);

    var commandHandlers = [function(){
      return mockTicTacToe
    }];

    var gameContext = require('./boundedContext')(mockStore, commandHandlers);

    var testCmd = {
      id: "123"
    };

    gameContext.handleCmd(testCmd);

    jm.verify(mockStore).loadEvents('123');

    jm.verify(mockTicTacToe).executeCommand(testCmd);

  })
})
