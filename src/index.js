// src/index.ts
import './css/style.css';

const CHARACTER_URL = 'https://raw.githubusercontent.com/netology-code/ahj-homeworks/AHJ-50/dom/pic/goblin.png';
const BOARD_SIZE = 4;
const MOVE_INTERVAL = 1000;

function createBoard() {
  const board = document.querySelector('#board');
  if (!board) throw new Error('Элемент #board не найден');

  const cells = [];
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
    cells.push(cell);
  }
  return cells;
}

function getRandomIndex(exclude) {
  let index = Math.floor(Math.random() * (BOARD_SIZE * BOARD_SIZE));
  while (index === exclude) {
    index = Math.floor(Math.random() * (BOARD_SIZE * BOARD_SIZE));
  }
  return index;
}

function init() {
  const cells = createBoard();
  const character = document.createElement('img');
  character.src = CHARACTER_URL;
  character.alt = 'Гном';

  let currentIndex = Math.floor(Math.random() * cells.length);
  cells[currentIndex].appendChild(character);

  setInterval(() => {
    const newIndex = getRandomIndex(currentIndex);
    cells[newIndex].appendChild(character);
    currentIndex = newIndex;
  }, MOVE_INTERVAL);
}

init();
