var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe')

var createEvent = {
  event: "GameCreated",
  user: {
    userName: "Thorri"
  },
  name: "TheFirstGame",
  timeStamp: "2014-12-02T11:29:29"
};

var joinEvent = {
  event:"EventJoined",
  user:{
    userName: "Max"
  },
  name: "TheFirstGame",
  timeStamp: "2014-12-02T11:29:29"
};

function moveEvent(coordinates, side){
  return{
    event: "MovePlaced",
    user:{
      userName: "Max"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29",
    move: {
      coordinates: coordinates,
      side: side
    }
  };
}
/* jshint ignore:start */


describe("Place move command", function() {
  var given, when, then;

  afterEach(function () {
    var actualEvents = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });

  it('should emit place move event', function () {
    given = [createEvent, joinEvent];

    when = {
      cmd: "PlaceMove",
      user: {
        userName: "Max"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29",
      move: {
        coordinates: [0, 0],
        side: 'X'
      }
    };

    then = [moveEvent([0, 0], 'X')];
  })


  it('should emit illegal move event', function () {
    given = [createEvent, joinEvent, moveEvent([1, 1], "O")];

    when = {
      cmd: "PlaceMove",
      user: {
        userName: "Thorri"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29",
      move: {
        coordinates: [1, 1],
        side: "X"
      }
    };

    then = [{
      event: "IllegalMove",
      user: {
        userName: "Thorri"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29",
      move: {
        coordinates: [1, 1],
        side: "X"
      }
    }]
  })

  // 00 01 02
  // 10 11 12
  // 20 21 22


  it('should emit game won event on vertical win on left side', function(){
    given = [createEvent, joinEvent, moveEvent([0,0], "O"), moveEvent([2,0], "O")];
    when = {
      cmd: "PlaceMove",
      user: {
        userName: "Max"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29",
      move: {
        coordinates: [1,0],
        side: "O"
      }
    };

    then = [
      moveEvent([1,0],"O"),
      {
        event: "GameWon",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
    }]
  })

  it('should emit game won event on vertical win on left side', function(){
    given = [createEvent, joinEvent, moveEvent([0,1], "O"), moveEvent([2,1], "O")];
    when = {
      cmd: "PlaceMove",
      user: {
        userName: "Max"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29",
      move: {
        coordinates: [1,1],
        side: "O"
      }
    };

    then = [
      moveEvent([1,1],"O"),
      {
        event: "GameWon",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
      }]
  })

  it('should emit game won event on diagonal win', function(){
    given = [createEvent, joinEvent, moveEvent([0,0], "O"), moveEvent([2,2], "O")];
    when = {
      cmd: "PlaceMove",
      user: {
        userName: "Max"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29",
      move: {
        coordinates: [1,1],
        side: "O"
      }
    };

    then = [
      moveEvent([1,1],"O"),
      {
        event: "GameWon",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
      }]
  })

  it('should emit game won event on diagonal win, now mirrored from former test', function(){
    given = [createEvent, joinEvent, moveEvent([0,2], "O"), moveEvent([2,0], "O")];
    when = {
      cmd: "PlaceMove",
      user: {
        userName: "Max"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29",
      move: {
        coordinates: [1,1],
        side: "O"
      }
    };

    then = [
      moveEvent([1,1],"O"),
      {
        event: "GameWon",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
      }]
  })

  it('should emit game won event on horizontal win', function(){
    given = [createEvent, joinEvent, moveEvent([0,0], "O"), moveEvent([0,2], "O")];
    when = {
      cmd: "PlaceMove",
      user: {
        userName: "Max"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29",
      move: {
        coordinates: [0,1],
        side: "O"
      }
    };

    then = [
      moveEvent([0,1],"O"),
      {
        event: "GameWon",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
      }]
  })

  it('should emit game won event on horizontal win', function(){
    given = [createEvent, joinEvent, moveEvent([2,0], "O"), moveEvent([2,2], "O")];
    when = {
      cmd: "PlaceMove",
      user: {
        userName: "Max"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29",
      move: {
        coordinates: [2,1],
        side: "O"
      }
    };

    then = [
      moveEvent([2,1],"O"),
      {
        event: "GameWon",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
      }]
  })


  // 00 01 02   x o x
  // 10 11 12   o o x
  // 20 21 22   x x o

  it('should emit draw event', function(){
    given = [createEvent, joinEvent,
      moveEvent([0,0], "X"),
      moveEvent([0,1], "O"),
      moveEvent([0,2], "X"),
      moveEvent([1,0], "O"),
      moveEvent([1,1], "O"),
      moveEvent([1,2], "X"),
      moveEvent([2,0], "X"),
      moveEvent([2,1], "X"),
    ];
    when = {
      cmd: "PlaceMove",
      user: {
        userName: "Max"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29",
      move: {
        coordinates: [2,2],
        side: "O"
      }
    };

    then = [
      moveEvent([2,2],"O"),
      {
        event: "GameDraw",
        user: {
          userName: "Max"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
      }]
  })

})
/* jshint ignore:end */
