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
            id: cmd.id,
            event: "GameCreated",
            user: cmd.user,
            name: cmd.name,
            timeStamp: cmd.timeStamp
          }]
        },
        "JoinGame": function (cmd) {
          if (gameState.gameFull()) {
            id: cmd.id,
            console.log("Game full");
            return [{
              event: "FullGameJoinAttempted",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }];
          }

          return [{
            id: cmd.id,
            event: "GameJoined",
            user: cmd.user,
            name: cmd.name,
            timeStamp: cmd.timeStamp
          }];
        },

        "PlaceMove": function (cmd) {
          if (gameState.occupied(cmd.move.coordinates)) {
            return [{
              id: cmd.id,
              event: "IllegalMove",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp,
              move: cmd.move
            }]
          }
          var events = [{
            id: cmd.id,
            event: "MovePlaced",
            user: cmd.user,
            name: cmd.name,
            timeStamp: cmd.timeStamp,
            move: cmd.move
          }];

          gameState.processEvents(events);
          if (gameState.gameWon()) {
            events.push(
              {
                id: cmd.id,
                event: "GameWon",
                user: cmd.user,
                name: cmd.name,
                timeStamp: cmd.timeStamp
              }
            )
          }

          if(gameState.gameDraw()){
            events.push(
              {
                id: cmd.id,
                event: "GameDraw",
                user: cmd.user,
                name: cmd.name,
                timeStamp: cmd.timeStamp
              }
            )
          }
          return events
        }
      };
      return cmdHandlers[cmd.cmd](cmd);
    }
  }
};
