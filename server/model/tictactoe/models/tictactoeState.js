/**
 * Created by Thorri on 12/3/14.
 */
var _ = require('lodash');

module.exports = function(history){
  var gameFull = false;
  var gridSize = 3;
  var gameGrid = [['','',''],['','','',],['','','']];
  var gameScore = [0,0,0,0,0,0,0,0,0];
  var moveCount = 0;

  function processEvent(event){
    if(event.event === "GameJoined"){
      gameFull = true;
    }
    if (event.event === 'MovePlaced'){
      var point = event.move.side==='X'? 1:-1; //if x number 1 gets assigned to that slot, if O , -1 gets assigned
      var row = event.move.coordinates[0];
      var col = event.move.coordinates[1];

      //these four lines are used to determine if the game is over
      gameScore[row] += point; // where point is either +1 or -1
      gameScore[gridSize + col] += point;
      if (row === col) gameScore[2*gridSize] += point;
      if (gridSize - 1 - col === row) gameScore[2*gridSize + 1] += point;

      gameGrid[row][col] = event.move.side;
      moveCount++;
    }
  }

  function gameWon(){

    return _.reduce(gameScore, function(won, score){
      return won || score === 3 || score === -3;

    }, false);
  }

  function processEvents(history){
      _.each(history, processEvent);
  };

  processEvents(history);

  return{
    processEvents : processEvents,
    gameFull: function(){
      return gameFull;
    },
    gameWon : gameWon,
    gameDraw : function(){
      if(gameWon()) return false;
      return moveCount === gridSize*gridSize;
    },
    occupied : function(coords){
      var row = coords[0];
      var col = coords[1];
      var squareToken = gameGrid[row][col];
      return (squareToken === "X" || squareToken === "O");
    }
  }
};
