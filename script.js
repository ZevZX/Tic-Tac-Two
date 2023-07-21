// Game state
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameEnded = false;
let playerCanMove = true;
let playerWins = 0;
let aiWins = 0;
const maxWins = 3;

// Start the game
function startGame() {
    const startScreen = document.querySelector(".start-screen");
    const gameBoard = document.querySelector(".board");  
    startScreen.style.display = "none";
    gameBoard.classList.remove("hidden");
    updateWins();
}

// Function to handle a player move
function handleMove(index) {
    document.querySelector(".player-wins").innerText = `Player Wins: ${playerWins}`;
    document.querySelector(".ai-wins").innerText = `Opponent Wins: ${aiWins}`;
    if (!gameEnded && board[index] === "" && playerCanMove) {
        board[index] = currentPlayer;
        document.getElementsByClassName("cell")[index].innerText = currentPlayer;
        if (checkWinner(currentPlayer)) {
            if (currentPlayer === "X") {
                playerWins++;
            } else {
                aiWins++;
            }
            updateWins();
            gameEnded = true;
        } else if (checkDraw()) {
            gameEnded = true;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (currentPlayer === "O" && !gameEnded) {
                playerCanMove = false;
                setTimeout(() => {
                    makeAIMove();
                    playerCanMove = true;
                }, 1000);
            }
        }
    }
}

// Function to update the displayed win counts
function updateWins() {
    document.querySelector(".player-wins").innerText = `Player Wins: ${playerWins}`;
    document.querySelector(".ai-wins").innerText = `Opponent Wins: ${aiWins}`;
}

// AI makes a move
function makeAIMove() {
    const availableIndices = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            availableIndices.push(i);
        }
    }
  
    if (availableIndices.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableIndices.length);
        const aiMoveIndex = availableIndices[randomIndex];
        board[aiMoveIndex] = currentPlayer;
        document.getElementsByClassName("cell")[aiMoveIndex].innerText = currentPlayer;
  
        if (checkWinner(currentPlayer)) {
            if (currentPlayer === "X") {
                playerWins++;
            } else {
                aiWins++;
            }
            updateWins();
            gameEnded = true;
        } else if (checkDraw()) {
            gameEnded = true;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            playerCanMove = true;
        }
    }
}
  
// Check for a winner
function checkWinner(player) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const isWinner = winPatterns.some(pattern => {
        return pattern.every(index => board[index] === player);
    });

    if (isWinner) {
        const status = document.querySelector(".status");
        status.textContent = `${player} wins!`;
        status.removeAttribute("hidden");
        setTimeout(resetBoard, 1000);
        return true;
    }

    return false;
}

// Check for a draw
function checkDraw() {
    const isDraw = board.every(cell => cell !== "");

    if (isDraw) {
        const status = document.querySelector(".status");
        status.textContent = "It's a draw!";
        status.removeAttribute("hidden");
        setTimeout(resetBoard, 1000);
        return true;
    }
  
    return false;
}

// Reset the game
function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameEnded = false;
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
    }
    const status = document.querySelector(".status");
    status.setAttribute("hidden", true);
    status.textContent = "";

    if (playerWins === maxWins || aiWins === maxWins) {
        const startScreen = document.querySelector(".start-screen");
        const gameBoard = document.querySelector(".board");
        startScreen.style.display = "block";
        gameBoard.classList.add("hidden");
        gameEnded = true;
        if (playerWins === maxWins) {
            status.textContent = "Congratulations! You won the match!";
        } else {
            status.textContent = "Your lost! Better luck next time!";
        }
        status.removeAttribute("hidden");
    }
    updateWins();
    if (!gameEnded && currentPlayer === "O") {
        playerCanMove = true;
        setTimeout(makeAIMove, 1000);
}
}

document.querySelector("button").addEventListener("click", resetBoard);