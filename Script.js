window.onload = function () {

let board = document.getElementById("board");
let statusText = document.getElementById("status");
let p1Name = document.getElementById("p1Name");
let p2Name = document.getElementById("p2Name");
let p1Timer = document.getElementById("p1Timer");
let p2Timer = document.getElementById("p2Timer");

let cells = [];
let currentPlayer = "X";
let gameActive = false;
let timer;
let timeLeft = 10;
let moveHistory = [];

window.startGame = function () {

    board.innerHTML = "";
    cells = [];
    moveHistory = [];
    gameActive = true;

    let name1 = document.getElementById("player1Input").value.trim();
    let name2 = document.getElementById("player2Input").value.trim();
    let firstPlayer = document.getElementById("firstTurn").value;

    p1Name.textContent = name1 || "Player 1";
    p2Name.textContent = name2 || "Player 2";

    currentPlayer = firstPlayer;

    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", function () {
            cellClick(i);
        });
        board.appendChild(cell);
        cells.push("");
    }

    updateStatus();
    startTimer();
};

function cellClick(index) {
    if (!gameActive || cells[index] !== "") return;

    cells[index] = currentPlayer;
    board.children[index].textContent = currentPlayer;
    moveHistory.push(index);

    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
    resetTimer();
}

function updateStatus() {
    statusText.textContent = currentPlayer + "'s Turn";
}

function startTimer() {
    timeLeft = 10;
    updateTimerDisplay();

    timer = setInterval(function () {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            switchPlayer();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    startTimer();
}

function updateTimerDisplay() {
    if (currentPlayer === "X") {
        p1Timer.textContent = timeLeft;
        p2Timer.textContent = 10;
    } else {
        p2Timer.textContent = timeLeft;
        p1Timer.textContent = 10;
    }
}

window.undoMove = function () {
    if (moveHistory.length === 0) return;

    let lastMove = moveHistory.pop();
    cells[lastMove] = "";
    board.children[lastMove].textContent = "";
    switchPlayer();
};

window.restartGame = function () {
    clearInterval(timer);
    board.innerHTML = "";
    statusText.textContent = "";
    p1Timer.textContent = "10";
    p2Timer.textContent = "10";
};

};        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return wins.some(combo =>
        combo.every(index => gameState[index] === currentPlayer)
    );
}
