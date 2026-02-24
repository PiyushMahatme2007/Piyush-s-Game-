let board;
let currentPlayer = "X";
let gameState = [];
let moveHistory = [];
let timerInterval = null;
let timeLeft = 10;
let gameActive = false;

window.onload = function () {
    board = document.getElementById("board");
};

function startGame() {

    gameState = ["", "", "", "", "", "", "", "", ""];
    moveHistory = [];
    gameActive = true;

    let p1 = document.getElementById("player1Input").value;
    let p2 = document.getElementById("player2Input").value;

    document.getElementById("p1Name").innerText = p1 || "Player 1";
    document.getElementById("p2Name").innerText = p2 || "Player 2";

    let firstTurn = document.getElementById("firstTurn").value;
    currentPlayer = firstTurn === "1" ? "X" : "O";

    createBoard();
    startTimer();
}

function createBoard() {

    board.innerHTML = "";

    for (let i = 0; i < 9; i++) {

        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.innerText = gameState[i];

        cell.addEventListener("click", function () {
            if (gameActive) makeMove(i);
        });

        board.appendChild(cell);
    }
}

function makeMove(index) {

    if (gameState[index] !== "") return;

    gameState[index] = currentPlayer;
    moveHistory.push(index);

    if (moveHistory.length > 6) {
        let removeIndex = moveHistory.shift();
        gameState[removeIndex] = "";
    }

    createBoard();

    if (checkWinner()) {
        clearInterval(timerInterval);
        document.getElementById("status").innerText =
            (currentPlayer === "X"
                ? document.getElementById("p1Name").innerText
                : document.getElementById("p2Name").innerText) + " Wins!";
        gameActive = false;
        return;
    }

    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    startTimer();
}

function startTimer() {

    clearInterval(timerInterval);
    timeLeft = 10;
    updateTimerDisplay();

    timerInterval = setInterval(function () {

        timeLeft--;
        updateTimerDisplay();

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            let winnerName =
                currentPlayer === "X"
                    ? document.getElementById("p2Name").innerText
                    : document.getElementById("p1Name").innerText;

            document.getElementById("status").innerText =
                "Time Over! " + winnerName + " Wins!";
            gameActive = false;
        }

    }, 1000);
}

function updateTimerDisplay() {

    if (currentPlayer === "X") {
        document.getElementById("p1Timer").innerText = timeLeft;
        document.getElementById("p2Timer").innerText = "";
    } else {
        document.getElementById("p2Timer").innerText = timeLeft;
        document.getElementById("p1Timer").innerText = "";
    }
}

function undoMove() {

    if (!gameActive) return;
    if (moveHistory.length === 0) return;

    clearInterval(timerInterval);

    let last = moveHistory.pop();
    gameState[last] = "";

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    createBoard();
    startTimer();
}

function restartGame() {
    clearInterval(timerInterval);
    document.getElementById("status").innerText = "";
    startGame();
}

function checkWinner() {

    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return wins.some(combo =>
        combo.every(index => gameState[index] === currentPlayer)
    );
}
