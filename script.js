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

// const playerFactory = (name, selection) => {
//   return { name, selection };
// };

// // player setting

// let player1name = prompt('Player 1 please enter your name');
// let player2name = prompt('Player 2 please enter your name');
// let player1selection = prompt(
//   ` ${player1name} please select X or O`
// ).toUpperCase();

// while (
//   player1selection.toUpperCase() != 'X' &&
//   player1selection.toUpperCase() != 'O'
// ) {
//   player1selection = prompt(
//     ` ${player1name} please select X or O`
//   ).toUpperCase();
// }

// let player2selection;
// player1selection == 'X' ? (player2selection = 'O') : (player2selection = 'X');

// if (player1name && player2name && player1selection) {
//   var player1 = playerFactory(player1name, player1selection);
//   var player2 = playerFactory(player2name, player2selection);
// }

// // player setting ends here

let origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
  document.querySelector('.endgame').style.display = 'none';
  origBoard = Array.from(Array(9).keys());
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
  }
}

function turnClick(square) {
  turn(square.target.id, huPlayer);
}

function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
}
