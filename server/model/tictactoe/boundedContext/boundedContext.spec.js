var should = require('should');
var _ = require('lodash');

describe('tictactoe game context using stub', function() {
  it('should route command to instantiated tictactoe game with event stream from store and return and store generated events.', function() {
    var calledWithEventStoreId;
    var storedEvents;

    var eventStub = {
      loadEvents: function(modelId){
        calledWithEventStoreId = modelId;
        return[];
      },
      storeEvents : function(aggregateId, events) {
        storedEvents = events;
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

    var cmdHandler = tictactoe;

    var gameContext = require('./boundedContext')(eventStub, cmdHandler);

    var testCmd = {
      id: "123"
    };

    var events = gameContext.handleCmd(testCmd);
    should(executedCommand.id).be.exactly("123")
    should(calledWithEventStoreId).be.exactly("123");
    should(events.length).be.exactly(0);
    should(storedEvents).be.exactly(events);
  })

  it('should route command to instantiated tictactoe game with event stream from store and return generated events, using mock style tests.', function(){

    var jm = require('jsmockito').JsMockito;
    jm.Integration.importTo(global);
    /* global spy,when */

    var mockStore = spy({
      loadEvents : function(){
    },
      storeEvents : function() {
      }
    });

    console.debug(mockStore)

    when(mockStore).loadEvents('123').thenReturn([]);

    var mockTicTacToe = spy({
      executeCommand : function(){
      }
    });

    when(mockTicTacToe).executeCommand().thenReturn([]);

    var cmdHandler = function(){
      return mockTicTacToe
    };

    var gameContext = require('./boundedContext')(mockStore, cmdHandler);

    var testCmd = {
      id: "123"
    };

    gameContext.handleCmd(testCmd);

    jm.verify(mockStore).loadEvents('123');
    jm.verify(mockStore).storeEvents('123');
    jm.verify(mockTicTacToe).executeCommand(testCmd);

  })
})
