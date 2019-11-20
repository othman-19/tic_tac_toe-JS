// Player Class

const playerFactory = (name, selection) => {
  return { name, selection};
};


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

if (player1name && player2name && player1selection){
  var player1 = playerFactory (player1name, player1selection)
  var player2  = playerFactory (player2name, player2selection)
}



const Board = {
  boardArray: [[], [], []]
};

// player1selection.toLowerCase !== 'x' || player1selection.toLowerCase !== 'o';
