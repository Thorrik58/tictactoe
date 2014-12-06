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
        "JoinGame": function(cmd){
          if(gameState.gameFull()){
            console.log("Game full");
            return[{
              event: "FullGameJoinAttempted",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }];
          }

          console.log("Join game");
          gameFull = true;
          return[{
            event: "GameJoined",
            user: cmd.user,
            name: cmd.name,
            timeStamp: cmd.timeStamp
          }];
        }
      }
      return cmdHandlers[cmd.cmd](cmd);
    }
  }
};
