// src/utils/tetris.ts

// Game board dimensions
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

// Cell states
export const EMPTY_CELL = 0;
export const FILLED_CELL = 1;

// Tetromino shapes (I, J, L, O, S, T, Z)
export const TETROMINOES = {
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    color: 'cyan',
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    color: 'blue',
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    color: 'orange',
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: 'yellow',
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: 'green',
  },
  T: {
    shape: [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: 'purple',
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: 'red',
  },
};

// Function to create an empty board
export const createBoard = () =>
  Array.from(Array(BOARD_HEIGHT), () => Array(BOARD_WIDTH).fill(EMPTY_CELL));

// Function to get a random tetromino
export const getRandomTetromino = () => {
  const tetrominoShapes = Object.keys(TETROMINOES);
  const randShape = tetrominoShapes[
    Math.floor(Math.random() * tetrominoShapes.length)
  ];
  return TETROMINOES[randShape];
};

// Function to rotate a tetromino
export const rotate = (matrix: number[][], dir: number) => {
  // Transpose rows and columns
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
    }
  }

  // Reverse rows or columns based on direction
  if (dir > 0) {
    return matrix.map((row) => row.reverse());
  } else {
    return matrix.reverse();
  }
};
