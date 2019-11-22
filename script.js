const boardModule = (() => {
  let boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  function reset() {
    boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }

  function putInBoard(id, selection) {
    if (typeof boardArray[id] !== 'string') {
      boardArray[id] = selection;
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
    boardArray, reset, putInBoard, checkWinner, checkTie,
  };
})();

const playerFactory = (name, selection) => ({ name, selection });

const game = (() => {
  let player1;
  let player2;
  const cells = document.querySelectorAll('.cell');
  const player1name = prompt('Player 1 please enter your name'); // eslint-disable-line no-alert
  const player2name = prompt('Player 2 please enter your name'); // eslint-disable-line no-alert
  let player1selection = prompt(`${player1name} please select X or O`).toUpperCase(); // eslint-disable-line no-alert
  while (
    player1selection.toUpperCase() !== 'X'
    && player1selection.toUpperCase() !== 'O'
  ) {
    player1selection = prompt(`${player1name} please select X or O`); // eslint-disable-line no-alert
    player1selection = player1selection.toUpperCase();
  }
  const player2selection = (player1selection === 'X') ? 'O' : 'X';

  if (player1name && player2name && player1selection) {
    player1 = playerFactory(player1name, player1selection);
    player2 = playerFactory(player2name, player2selection);
  }

  let currentSelection = player1.selection;

  function changeRole() {
    currentSelection = (currentSelection === player1.selection)
      ? player2.selection : player1.selection;
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

  function addEventListenerToCell() {
    for (let i = 0; i < cells.length; i += 1) {
      cells[i].addEventListener('click', fillCell, false);
    }
  }

  const resetBtn = document.querySelector('BUTTON');

  function gamePlay() {
    boardModule.reset();
    addEventListenerToCell();
  }

  function resetButton() {
    for (let i = 0; i < cells.length; i += 1) {
      cells[i].innerText = '';
    }
    document.querySelector('.endgame').style.display = 'none';
    currentSelection = player1.selection;
    gamePlay();
  }

  resetBtn.addEventListener('click', resetButton);
  return { gamePlay };
})();

game.gamePlay();
