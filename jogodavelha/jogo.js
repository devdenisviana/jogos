// Define as variáveis
let currentPlayer = 'X';
let gameFinished = false;
let movesPlayed = 0;

// Define as combinações vencedoras
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
  [0, 4, 8], [2, 4, 6]             // diagonais
];

// Define a função para verificar se o jogo acabou em empate
function checkTie() {
  return movesPlayed === 9;
}

// Define a função para verificar se um jogador ganhou
function checkWinningCondition() {
  for (let combination of winningCombinations) {
    if (combination.every(cellIndex => document.getElementById(`cell-${cellIndex}`).innerText === currentPlayer)) {
      return true;
    }
  }
  return false;
}

// Define a função para atualizar o estado do jogo
function updateGame(cell) {
  cell.innerText = currentPlayer;
  movesPlayed++;
  if (checkWinningCondition()) {
    gameFinished = true;
    document.getElementById('message').innerText = `Parabéns, jogador ${currentPlayer} venceu!`;
  } else if (checkTie()) {
    gameFinished = true;
    document.getElementById('message').innerText = 'Empate!';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('message').innerText = `É a vez do jogador ${currentPlayer}`;
  }
}

// Define a função para lidar com o clique em uma célula
function handleClick(cell) {
  if (gameFinished || cell.innerText !== '') {
    return;
  }
  updateGame(cell);
}

// Adiciona um evento de clique para cada célula
for (let i = 0; i < 9; i++) {
  const cell = document.getElementById(`cell-${i}`);
  cell.addEventListener('click', () => handleClick(cell));
}