var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe')

describe("Create game command", function()
{
  it('Should emit game created event', function(){

    var given = [];

    var when = {
      cmd: "CreateGame",
      user: {
        userName: "Thorri"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };

    var then = [{
      event: "GameCreated",
      user: {
        userName: "Thorri"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents.length).be.exactly(1);
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  })
})
