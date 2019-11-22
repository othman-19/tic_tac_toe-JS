/*
Our board object
array//
winning combs//
render new //

reset//
put in board//
check winning moves //
check for tie//
check for full board
position
*/

const boardModule = (() => {
  let boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
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
  // function render() {
  //   boardArray.forEach((selection, index) => {
  //     document.getElementById(index).innerHTML = selection;
  //   });
  // }

  function reset() {
    boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    // render();
  }

  function putInBoard(id, selection) {
    if (typeof boardArray[id] !== 'string') {
      boardArray[id] = selection;
      // render();
    }
  }

  function checkWinner(l) {
    if (
      (boardArray[0] === l && boardArray[1] === l && boardArray[2] === l)
      || (boardArray[3] === l && boardArray[4] === l && boardArray[5] === l)
      || (boardArray[6] === l && boardArray[7] === l && boardArray[8] === l)
      || (boardArray[0] === l && boardArray[3] === l && boardArray[6] === l)
      || (boardArray[1] === l && boardArray[4] === l && boardArray[7] === l)
      || (boardArray[2] === l && boardArray[5] === l && boardArray[8] === l)
      || (boardArray[0] === l && boardArray[4] === l && boardArray[8] === l)
      || (boardArray[6] === l && boardArray[4] === l && boardArray[2] === l)
    ) {
      return l;
    } return false;
  }

  function checkTie() {
    return boardArray.every(i => typeof i === 'string');
  }

  return {
    boardArray, reset, putInBoard, checkWinner, checkTie
  };
})();

/*
player factory
name and selection

*/
const playerFactory = (name, selection) => ({ name, selection });


// 2 players //
// player name and selection // 
// We need to create the players using playerfactory // 
// current player //
// we need to change the current player on every turn //
// Create board
// check for tie 
// check for winner after everymove 
// reset the board on click 
// display result and winner name


const game = (() => {

  const cells = document.querySelectorAll('.cell');
  const player1name = prompt('Player 1 please enter your name');
  const player2name = prompt('Player 2 please enter your name');
  let player1selection = prompt(
    ` ${player1name} please select X or O`
  ).toUpperCase();
  while (
    player1selection.toUpperCase() !== 'X'
    && player1selection.toUpperCase() !== 'O'
  ) {
    player1selection = prompt(`${player1name} please select X or O`); // eslint-disable-line no-alert
    player1selection = player1selection.toUpperCase();
  }
  const player2selection = (player1selection === 'X') ? 'O' : 'X';

  if (player1name && player2name && player1selection) {
    var player1 = playerFactory(player1name, player1selection);
    var player2 = playerFactory(player2name, player2selection);
  }

  let currentSelection = player1.selection;

  function changeRole() {
    currentSelection = (currentSelection === player1.selection)
      ? player2.selection : player1.selection;
  }

  function addEventListenerToCell() {
    for (let i = 0; i < cells.length; i += 1) {
      cells[i].addEventListener('click', fillCell, false);
    }
  }

  function getWinner(s) {
    let winner;
    if (s === player1.selection) {
      winner = player1.name;
    } else {
      winner = player2.name;
    }
    return winner;
  }


  function display(result) {
    const resultDisplay = document.querySelector('.endgame');
    const resultText = document.querySelector('.endgame .text');
    if (result === boardModule.checkWinner(currentSelection)) {
      resultDisplay.style.display = 'block';
      resultText.innerHTML = `The winner is ${getWinner(currentSelection)}`;
    } else if (result === boardModule.checkTie()) {
      resultDisplay.style.display = 'block';
      resultText.innerHTML = 'The game is a draw';
    }
  }
  function fillCell(e) {
    console.log(e.target)
    if (!e.target.innerText) {
      e.target.innerText = currentSelection;
      boardModule.putInBoard(e.target.id, currentSelection);
      if (boardModule.checkWinner(currentSelection)) {
        display(boardModule.checkWinner(currentSelection));
        for (let i = 0; i < cells.length; i += 1) {
          cells[i].removeEventListener('click', fillCell, false);
        }
      } else if (boardModule.checkTie()) {
        for (let i = 0; i < cells.length; i += 1) {
          cells[i].removeEventListener('click', fillCell, false);
        }
        display(boardModule.checkTie());
      }
      changeRole();  
    }
  }



  // tie or winner display also has to be added

  function gamePlay(){
    boardModule.reset();
    addEventListenerToCell();

  }
 
  return {gamePlay};
})();


game.gamePlay();












/* 
let boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const resultDisplay = document.querySelector('.endgame');
const resultText = document.querySelector('.endgame .text');
const playerFactory = (name, selection) => ({ name, selection });

const player1 = (() => {
  const player1name = prompt('Player 1 please enter your name');// eslint-disable-line no-alert
  let player1selection = prompt(`${player1name} please select X or O`).toUpperCase();// eslint-disable-line no-alert
  while (
    player1selection.toUpperCase() !== 'X'
    && player1selection.toUpperCase() !== 'O'
  ) {
    player1selection = prompt(`${player1name} please select X or O`);// eslint-disable-line no-alert
    player1selection = player1selection.toUpperCase();
  }
  return playerFactory(player1name, player1selection);
})();

const player2 = (() => {
  const player2name = prompt('Player 2 please enter your name');// eslint-disable-line no-alert
  const player2selection = (player1.selection === 'X') ? 'O' : 'X';
  return playerFactory(player2name, player2selection);
})();
let currentSelection = player1.selection;
const cells = document.querySelectorAll('.cell');


function putInBoard(id, selection) {
  boardArray[id] = selection;
}

function winnerDisplay(winner) {
  resultDisplay.style.display = 'block';
  resultText.innerHTML = `The winner is ${winner}`;
}


function declareWinner(lastSelection) {
  let winner;
  if (lastSelection === player1.selection) {
    winner = player1.name;
  } else {
    winner = player2.name;
  }
  winnerDisplay(winner);
  return winner;
}

function checkWinner(l) {
  if (
    (boardArray[0] === l && boardArray[1] === l && boardArray[2] === l)
    || (boardArray[3] === l && boardArray[4] === l && boardArray[5] === l)
    || (boardArray[6] === l && boardArray[7] === l && boardArray[8] === l)
    || (boardArray[0] === l && boardArray[3] === l && boardArray[6] === l)
    || (boardArray[1] === l && boardArray[4] === l && boardArray[7] === l)
    || (boardArray[2] === l && boardArray[5] === l && boardArray[8] === l)
    || (boardArray[0] === l && boardArray[4] === l && boardArray[8] === l)
    || (boardArray[6] === l && boardArray[4] === l && boardArray[2] === l)
  ) {
    return declareWinner(l);
  } return false;
}

function checkTie() {
  return boardArray.every(i => typeof i === 'string');
}


function tieDisplay() {
  resultDisplay.style.display = 'block';
  resultText.innerHTML = 'The game is a draw';
}

function changeRole() {
  currentSelection = (currentSelection === player1.selection)
    ? player2.selection : player1.selection;
}

function fillCell(e) {
  if (!e.target.innerText) {
    e.target.innerText = currentSelection;
    putInBoard(e.target.id, currentSelection);
    if (checkWinner(currentSelection)) {
      for (let i = 0; i < cells.length; i += 1) {
        cells[i].removeEventListener('click', fillCell, false);
      }
    } else if (checkTie()) {
      tieDisplay();
    }
  }
  changeRole();
}

function addEventListenerToCell() {
  for (let i = 0; i < cells.length; i += 1) {
    cells[i].addEventListener('click', fillCell, false);
  }
}

function start() {
  boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  currentSelection = player1.selection;
  document.querySelector('.endgame').style.display = 'none';
  addEventListenerToCell();
}

function reset() {
  for (let i = 0; i < cells.length; i += 1) {
    cells[i].innerText = '';
  }
  start();
}

const resetBtn = document.querySelector('BUTTON');
resetBtn.addEventListener('click', reset);
start();
 */