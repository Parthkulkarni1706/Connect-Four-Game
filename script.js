const ROWS = 6;
const COLS = 7;

let board = [];
let gameOver = false;

let currentPlayer = "red";

let player1Score = 0;
let player2Score = 0;

const boardDiv = document.getElementById("board");
const statusText = document.getElementById("status");

createBoard();

document
.getElementById("themeBtn")
.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});

function createBoard(){

    board = [];
    boardDiv.innerHTML = "";

    for(let r=0; r<ROWS; r++){

        board[r] = [];

        for(let c=0; c<COLS; c++){

            board[r][c] = "";

            const cell = document.createElement("div");

            cell.classList.add("cell");

            cell.dataset.row = r;
            cell.dataset.col = c;

            cell.addEventListener("click", () => {

                if(gameOver) return;

                playerMove(c);

            });

            boardDiv.appendChild(cell);
        }
    }
}

function playerMove(col){

    if(placePiece(col,currentPlayer)){

        currentPlayer =
        currentPlayer === "red"
        ? "yellow"
        : "red";

        if(!gameOver){

            statusText.textContent =
            currentPlayer === "red"
            ? "Player 1's Turn"
            : "Player 2's Turn";
        }
    }
}

function placePiece(col,color){

    for(let row=ROWS-1; row>=0; row--){

        if(board[row][col] === ""){

            board[row][col] = color;

            updateBoard();

            if(checkWinner(row,col)){

                if(color === "red"){

                    player1Score++;

                    document.getElementById(
                    "player1Score"
                    ).textContent = player1Score;

                    statusText.textContent =
                    "🎉 Player 1 Wins!";
                }
                else{

                    player2Score++;

                    document.getElementById(
                    "player2Score"
                    ).textContent = player2Score;

                    statusText.textContent =
                    "🎉 Player 2 Wins!";
                }

                gameOver = true;
                return true;
            }

            if(isBoardFull()){

                statusText.textContent =
                "🤝 Draw Match";

                gameOver = true;
            }

            return true;
        }
    }

    return false;
}

function updateBoard(){

    const cells =
    document.querySelectorAll(".cell");

    cells.forEach(cell => {

        let row = cell.dataset.row;
        let col = cell.dataset.col;

        cell.classList.remove(
        "red",
        "yellow"
        );

        if(board[row][col]){

            cell.classList.add(
            board[row][col]
            );
        }
    });
}

function countDirection(
row,
col,
rowDir,
colDir
){

    let count = 0;

    let color = board[row][col];

    let r = row + rowDir;
    let c = col + colDir;

    while(
        r >= 0 &&
        r < ROWS &&
        c >= 0 &&
        c < COLS &&
        board[r][c] === color
    ){

        count++;

        r += rowDir;
        c += colDir;
    }

    return count;
}

function checkWinner(row,col){

    const directions = [
        [0,1],
        [1,0],
        [1,1],
        [1,-1]
    ];

    for(let [dr,dc] of directions){

        let total = 1;

        total += countDirection(
            row,col,dr,dc
        );

        total += countDirection(
            row,col,-dr,-dc
        );

        if(total >= 4){
            return true;
        }
    }

    return false;
}

function isBoardFull(){

    for(let c=0; c<COLS; c++){

        if(board[0][c] === ""){
            return false;
        }
    }

    return true;
}

function restartGame(){

    gameOver = false;

    currentPlayer = "red";

    statusText.textContent =
    "Player 1's Turn";

    createBoard();
}