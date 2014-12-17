### JS

I changed the gameWon function in tictactoeState.js so one player can win with only 2 moves.
The e2e tests caught this though.

I initialized the board like this: 
	
	board: [["X", "X", "X"], ["X", "X", "X"], ["X", "X", "X"]]

The e2e did not catch this.

### HTML

I removed "track by $index" in tictactoe.html, so that the board is one solid piece. The e2e tests caught it.

### CSS

I added "visibility: hidden;" to the .board class so the game is unplayable, again, the e2e tests caught this.