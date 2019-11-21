// // Player Class
// let origBoard;
// const winCombos = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [6, 4, 2]
// ];
const boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const playerFactory = (name, selection) => {
  return { name, selection };
};

let player1 = (function() {
  let player1name = prompt('Player 1 please enter your name');
  let player1selection = prompt(
    ` ${player1name} please select X or O`
  ).toUpperCase();
  while (
    player1selection.toUpperCase() != 'X' &&
    player1selection.toUpperCase() != 'O'
  ) {
    player1selection = prompt(
      ` ${player1name} please select X or O`
    ).toUpperCase();
  }
  return playerFactory(player1name, player1selection);
})();

let player2 = (function() {
  let player2name = prompt('Player 2 please enter your name');
  let player2selection;
  player1.selection == 'X'
    ? (player2selection = 'O')
    : (player2selection = 'X');
  return playerFactory(player2name, player2selection);
})();
let currentSelection = player1.selection;
const cells = document.querySelectorAll('.cell');

function addEventListenerToCell() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', fillCell, false);
  }
}

function fillCell(e) {
  //console.log(e.target.innerText)
  if (!e.target.innerText) {
    e.target.innerText = currentSelection;
    putInBoard(e.target.id, currentSelection)
    changeRole();
  }
}

function putInBoard(id, selection){
  boardArray[id] = selection;
}
function changeRole() {
  currentSelection == player1.selection
    ? (currentSelection = player2.selection)
    : (currentSelection = player1.selection);
}

function start() {
  addEventListenerToCell();
}

function reset() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    // cells[i].style.removeProperty('background-color');
  }
  start();
}

start();


// // player setting ends here

// let origBoard;
// const huPlayer = 'O';
// const aiPlayer = 'X';
// const winCombos = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [6, 4, 2]
// ];

// const cells = document.querySelectorAll('.cell');
// startGame();

// function startGame() {
//   document.querySelector('.endgame').style.display = 'none';
//   origBoard = Array.from(Array(9).keys());
//   for (let i = 0; i < cells.length; i++) {
//     cells[i].innerText = '';
//     cells[i].style.removeProperty('background-color');
//     cells[i].addEventListener('click', turnClick, false);
//   }
// }

// function turnClick(square) {
//   if (typeof origBoard[square.target.id] == 'number') {
//     turn(square.target.id, huPlayer);
//     if (!checkTie()) turn(bestSpot(), aiPlayer);
//   }
// }

// function turn(squareId, player) {
//   origBoard[squareId] = player;
//   document.getElementById(squareId).innerText = player;
//   let gameWon = checkWin(origBoard, player);
//   if (gameWon) gameOver(gameWon);
// }

// function checkWin(board, player) {
//   let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
//   let gameWon = null;
//   for (let [index, win] of winCombos.entries()) {
//     if (win.every(elem => plays.indexOf(elem) > -1)) {
//       gameWon = { index: index, player: player };
//       break;
//     }
//   }
//   return gameWon;
// }

// function gameOver(gameWon) {
//   for (let index of winCombos[gameWon.index]) {
//     document.getElementById(index).style.backgroundColor =
//       gameWon.player == huPlayer ? 'blue' : 'red';
//   }

//   for (let i = 0; i < cells.length; i++) {
//     cells[i].removeEventListener('click', turnClick, false);
//   }
//   declareWinner(gameWon.player == huPlayer ? 'You Win' : 'You Lose');
// }

// function declareWinner(who) {
//   document.querySelector('.endgame').style.display = 'block';
//   document.querySelector('.endgame .text').innerText = who;
// }

// function emptySquares() {
//   return origBoard.filter(s => typeof s == 'number');
// }

// function bestSpot() {
//   return emptySquares()[0];
// }

// function checkTie() {
//   if (emptySquares().length == 0) {
//     for (let i = 0; i < cells.length; i++) {
//       cells[i].style.backgroundColor = 'green';
//       cells[i].removeEventListener('click', turnClick, false);
//     }
//     declareWinner('Tie Game');
//     return true;
//   }
//   return false;
// }
