/**
 * Created by Thorri on 12/4/14.
 */

module.exports = function(history){

  var tictactoeState = require('./tictactoeState');
  var gameState = tictactoeState(history);

  return {
    executeCommand: function(cmd){
      var cmdHandlers = {
        "CreateGame": function (cmd) {
          return [{
            event: "GameCreated",
            user: cmd.user,
            name: cmd.name,
            timeStamp: cmd.timeStamp
          }]
        },
        "JoinGame": function (cmd) {
          if (gameState.gameFull()) {
            console.log("Game full");
            return [{
              event: "FullGameJoinAttempted",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }];
          }

          gameFull = true;
          return [{
            event: "GameJoined",
            user: cmd.user,
            name: cmd.name,
            timeStamp: cmd.timeStamp
          }];
        },

        "PlaceMove": function (cmd) {
          if (gameState.occupied(cmd.move.coordinates)) {
            return [{
              event: "IllegalMove",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp,
              move: cmd.move
            }]
          }
          var events = [{
            event: "MovePlaced",
            user: cmd.user,
            name: cmd.name,
            timeStamp: cmd.timeStamp,
            move: cmd.move
          }];

          gamestate.processEvents(events);
          if (gameState.gameWon()) {
            events.push(
              {
                event: "GameWon",
                user: cmd.user,
                name: cmd.name,
                timeStamp: cmd.timeStamp
              }
            )
          }
          return events;
        }
      };
      return cmdHandlers[cmd.cmd](cmd);
    }
  }
};
