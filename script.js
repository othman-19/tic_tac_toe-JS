// Player Class

function Player(name, selection) {
  this.name = name;
  this.selection = selection;
}

let player1name = prompt('Player 1 please enter your name');
let player2name = prompt('Player 2 please enter your name');
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

let player2selection;
player1selection == 'X' ? (player2selection = 'O') : (player2selection = 'X');

const Board = {
  boardArray: [[], [], []]
};

// player1selection.toLowerCase !== 'x' || player1selection.toLowerCase !== 'o';
