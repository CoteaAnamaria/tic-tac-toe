// https://www.youtube.com/watch?v=Y-GkMjUZsmM


// players
const xPlayer = 'X';
const oPlayer = 'O';
// cells
const cellin = document.querySelectorAll(".cellin");
// board
const board = document.querySelector(".container");
// turn text
const whosTurn = document.getElementById('text');
// parent with winning txt and button
const winningMessageAndButton = document.querySelector('.winning-message-and-button');
const winningMessageText = document.getElementById('winningMessage');
// restart
const restartButton = document.getElementById('restartButton');
// winning board
const winningBoardComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
// initiate
let oTurn;
startGame();

// restart
restartButton.addEventListener( "click", startGame);

function startGame() {
oTurn = false;
// go throw every cell adding an event click ,only once
cellin.forEach(cell => {
    // remove everithyng for next game
    cell.classList.remove(xPlayer);
    cell.classList.remove(oPlayer);
    cell.removeEventListener( "click" ,handleClick);

    cell.addEventListener('click', handleClick, { once: true })
});

winningMessageAndButton.classList.remove('show');
whosTurn.innerHTML= `Loading..`;
}

// what happens when clicked
function handleClick(e) {
    const cell = e.target;
    const currentPlayer = oTurn ? oPlayer : xPlayer;

    // place the mark x/o
    placeMark(cell, currentPlayer);

    // mesage to show next player's turn
    playerTurnMessage(currentPlayer)

    // win or draw
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }


}
// place the mark x/o function
function placeMark(cell, currentPlayer) {
    cell.classList.add(currentPlayer);
}
// switch turn function
function swapTurns() {
    oTurn = !oTurn;
}
// check winner
function checkWin(currentPlayer) {
    return winningBoardComb.some(comb => {
        return comb.every(index => {
            return cellin[index].classList.contains(currentPlayer)
        })
    })

}
// player's turn message
function playerTurnMessage(currentPlayer) {
    if (currentPlayer === xPlayer) {
        whosTurn.innerText = "O's Turn";
    } else {
        whosTurn.innerText = "X's Turn";
    }
}

// check for draw
function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = 'Draw!';
    } else {
        winningMessageText.innerText = `Congratulation Player ${oTurn ? 'O' : 'X'} you've Won!`;
    }
    winningMessageAndButton.classList.add('show');
}

function isDraw() {
    return [...cellin].every(cell => {
        return cell.classList.contains(xPlayer) || cell.classList.contains(oPlayer)
    })
}