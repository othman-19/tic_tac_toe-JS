let boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

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
  alert(`${player2name} you are ${player2selection}`);
  return playerFactory(player2name, player2selection);
})();
let currentSelection = player1.selection;
const cells = document.querySelectorAll('.cell');

function addEventListenerToCell() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', fillCell, false);
  }
}

function removeEventListenerFromCell() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', fillCell, false);
  }
}

function fillCell(e) {
  if (!e.target.innerText) {
    e.target.innerText = currentSelection;
    putInBoard(e.target.id, currentSelection);
    if (checkWinner(currentSelection)) {
      endGame();
    } else {
      if (checkTie()) {
        tieDisplay();
        endGame();
      }
    }
    changeRole();
  }
}

function putInBoard(id, selection) {
  boardArray[id] = selection;
}

function checkWinner(l) {
  if (
    (boardArray[0] == l && boardArray[1] == l && boardArray[2] == l) ||
    (boardArray[3] == l && boardArray[4] == l && boardArray[5] == l) ||
    (boardArray[6] == l && boardArray[7] == l && boardArray[8] == l) ||
    (boardArray[0] == l && boardArray[3] == l && boardArray[6] == l) ||
    (boardArray[1] == l && boardArray[4] == l && boardArray[7] == l) ||
    (boardArray[2] == l && boardArray[5] == l && boardArray[8] == l) ||
    (boardArray[0] == l && boardArray[4] == l && boardArray[8] == l) ||
    (boardArray[6] == l && boardArray[4] == l && boardArray[2] == l)
  ) {
    return declareWinner(l);
  } else {
    return false;
  }
}

function declareWinner(lastSelection) {
  let winner;
  if (lastSelection == player1.selection) {
    winner = player1.name;
  } else {
    winner = player2.name;
  }
  winnerDisplay(winner);
  return winner;
}

const resultDisplay = document.querySelector('.endgame');
const resultText = document.querySelector('.endgame .text');

function winnerDisplay(winner) {
  resultDisplay.style.display = 'block';
  resultText.innerHTML = `The winner is ${winner}`;
}

function checkTie() {
  return boardArray.every(i => {
    return typeof i === 'string';
  });
}

function tieDisplay() {
  resultDisplay.style.display = 'block';
  resultText.innerHTML = `The game is a draw`;
}

function endGame() {
  removeEventListenerFromCell();
}

function changeRole() {
  currentSelection == player1.selection
    ? (currentSelection = player2.selection)
    : (currentSelection = player1.selection);
}

function start() {
  boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  currentSelection = player1.selection;
  document.querySelector('.endgame').style.display = 'none';
  addEventListenerToCell();
}

function reset() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
  }
  start();
}

const resetBtn = document.querySelector('BUTTON');
resetBtn.addEventListener('click', reset);
start();
