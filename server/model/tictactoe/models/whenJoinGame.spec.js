var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe')

describe('Join game command', function() {
  it('should emit game joined event', function(){

    var given = [{
      event: "GameCreated",
      user: {
        userName: "Thorri"
      },
      name: "The first game",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var when = {
      cmd: "JoinGame",
      user: {
        userName: "Max"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };

    var then = [{
      event: "GameJoined",
      user: {
        userName: "Max"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });

  it('should emit FullGameJoinAttempt event when game is full', function(){

    var given = [{
      event: "GameCreated",
      user: {
        userName: "Thorri"
      },
      name: "The first game",
      timeStamp: "2014-12-02T11:29:29"
    },
      {
        event: "GameJoined",
        user: {
          userName: "Max"
        },
        name:"TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
      }
    ];

    var when = {
      cmd: "JoinGame",
      user: {
        userName: "Max"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };

    var then = [{
      event: "FullGameJoinAttempted",
      user: {
        userName: "Max"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  })
});

