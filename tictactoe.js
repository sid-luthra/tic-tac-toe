const createPlayer = (name, marker) => {
    return {name, marker};
} 

const gameBoard = (() => {
    let board = [];
    const setupBoard = () => {
        
        const header = document.createElement("div");
        header.id = "header";
        
        title = document.createElement("div");
        title.id = "title";
        title.textContent = "Tic Tac Toe";
        header.appendChild(title);
        
        resetButton = document.createElement("button");
        resetButton.id = "resetButton";
        resetButton.classList.add("button");
        resetButton.textContent = "Reset Game";
        resetButton.addEventListener('click', resetBoard);
        header.appendChild(resetButton);        

        document.querySelector("body").appendChild(header);
        
        const instructions = document.createElement("div");
        instructions.id = "instructions";
        instructions.textContent = `${game.activePlayer.name}'s turn.`;
        document.querySelector("body").appendChild(instructions);

        const boardArea = document.createElement("div");
        boardArea.id = "boardArea";
        
        for (i = 0; i < 9; i++) {
            board.push('');
            const square = document.createElement("div");
            square.id = `square${i}`;
            square.classList.add("squares");
            square.addEventListener('click',placeMarker);
            boardArea.appendChild(square);
            }
        document.querySelector("body").appendChild(boardArea);

    }

    const placeMarker = (e) => {
        const square = e.target;
        const index = e.target.id[6];
        board[index] = game.activePlayer.marker;
        square.textContent = game.activePlayer.marker;
        square.style.pointerEvents = "none";
        game.takeTurn();
        if (game.gameOver) {
            const allSquares = document.querySelectorAll(".squares");
            allSquares.forEach(square => {
                square.style.pointerEvents = "none";
            })
            if (game.gameTie) {
                instructions.textContent = "It's a tie!";
            } else {
                instructions.textContent = `${game.activePlayer.name} wins!`;
            };
        } else {
            instructions.textContent = `${game.activePlayer.name}'s turn.`;
        };
        console.log(board);
    }

    const resetBoard = () => {
        for (i = 0; i < 9; i++) {
            gameBoard.board[i] = '';
        };
        const allSquares = document.querySelectorAll(".squares");
        allSquares.forEach(square => {
            square.style.pointerEvents = "auto";
            square.textContent = "";
        });
        game.newGame();
        instructions.textContent = `${game.activePlayer.name}'s turn.`;
    }

    return {board, setupBoard};
})();

const game = (() => {
    const player1 = createPlayer("Player 1","X");
    const player2 = createPlayer("Player 2","O");
    let activePlayer = player1;
    let firstPlayer = player1;
    let gameOver = false;

    const winningCombos = [
        // rows
        [0,1,2],
        [3,4,5],
        [6,7,8],
        // columns
        [0,3,6],
        [1,4,7],
        [2,5,8],
        // diagonals
        [0,4,8],
        [2,4,6]
    ]

    const takeTurn = () => {
        const noWinner = checkWinner();
        const tie = checkTie();
        if (noWinner) {
            if (!tie) {
                switchPlayer();
                game.gameOver = false;
            } else {
                game.gameOver = true;
                game.gameTie = true;
            }
        } else {
            game.gameOver = true;
        }
    }

    const checkWinner = () => {
        let activeWinner = game.activePlayer.marker + game.activePlayer.marker + game.activePlayer.marker;
        noWinner = winningCombos.every((combo) => {
            let checkString = "";
            combo.forEach((square) => {
                checkString = checkString + gameBoard.board[square];
            });
            console.log(checkString);
            return (checkString === activeWinner) ? false : true;
        });
        console.log(`No winner is: ${noWinner}`);
        return noWinner;
    }

    const checkTie = () => {
        squaresLeft = gameBoard.board.reduce((total,square) => {
            return (square === "") ? total + 1 : total;
        },0);
        console.log(`${squaresLeft} squares remaining.`)
        const isTie = (squaresLeft === 0);
        return isTie;
    }

    const switchPlayer = () => {
        game.activePlayer === player1 ? game.activePlayer = player2 : game.activePlayer = player1;
    }

    const newGame = () => {
        firstPlayer === player1 ? firstPlayer = player2 : firstPlayer = player1;
        game.activePlayer = firstPlayer;
        game.gameOver = false;
    }

    return {gameOver, activePlayer, takeTurn, newGame}
})();

gameBoard.setupBoard();