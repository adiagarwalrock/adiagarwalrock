<template>
  <div class="tetris-app">
    <div class="game-board">
      <div v-for="(row, y) in displayBoard" :key="y" class="row">
        <div
          v-for="(cell, x) in row"
          :key="x"
          :class="['cell', cell === 0 ? 'empty' : 'filled']"
          :style="{ backgroundColor: cell === 0 ? '' : getCellColor(x, y) }"
        ></div>
      </div>
    </div>
    <div class="game-info">
      <h3>Score: {{ score }}</h3>
      <h3>Level: {{ level }}</h3>
      <button @click="startGame">Start Game</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  EMPTY_CELL,
  TETROMINOES,
  createBoard,
  getRandomTetromino,
  rotate,
  FILLED_CELL,
} from '../../utils/tetris';

interface Piece {
  shape: number[][];
  color: string;
  x: number;
  y: number;
}

const board = ref(createBoard());
const currentPiece = ref<Piece | null>(null);
const score = ref(0);
const level = ref(1);
const gameOver = ref(false);

const displayBoard = computed(() => {
  const newBoard = board.value.map((row) => [...row]); // Deep copy the board

  if (currentPiece.value) {
    currentPiece.value.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (
          cell !== EMPTY_CELL &&
          currentPiece.value &&
          currentPiece.value.y + y >= 0 &&
          currentPiece.value.y + y < BOARD_HEIGHT &&
          currentPiece.value.x + x >= 0 &&
          currentPiece.value.x + x < BOARD_WIDTH
        ) {
          newBoard[currentPiece.value.y + y][currentPiece.value.x + x] = FILLED_CELL; // Mark as filled for rendering
        }
      });
    });
  }
  return newBoard;
});

const getCellColor = (x: number, y: number): string => {
  if (currentPiece.value) {
    for (let row = 0; row < currentPiece.value.shape.length; row++) {
      for (let col = 0; col < currentPiece.value.shape[row].length; col++) {
        if (
          currentPiece.value.shape[row][col] !== EMPTY_CELL &&
          currentPiece.value.x + col === x &&
          currentPiece.value.y + row === y
        ) {
          return currentPiece.value.color;
        }
      }
    }
  }
  // If not part of current piece, check the board
  if (board.value[y][x] !== EMPTY_CELL) {
    // For simplicity, we'll just use a generic filled color for merged pieces
    // In a more advanced game, you'd store the color of the merged piece
    return 'gray'; 
  }
  return ''; // Empty cell
};

let dropInterval: number | null = null;

const startGame = () => {
  board.value = createBoard();
  score.value = 0;
  level.value = 1;
  gameOver.value = false;
  currentPiece.value = spawnPiece();
  dropInterval = window.setInterval(drop, 1000 / level.value);
};

const spawnPiece = (): Piece => {
  const newPiece = getRandomTetromino();
  return {
    shape: newPiece.shape,
    color: newPiece.color,
    x: Math.floor(BOARD_WIDTH / 2) - Math.floor(newPiece.shape[0].length / 2),
    y: 0,
  };
};

const drop = () => {
  if (!currentPiece.value) return;

  const newY = currentPiece.value.y + 1;
  if (!checkCollision(currentPiece.value.x, newY, currentPiece.value.shape)) {
    currentPiece.value.y = newY;
  } else {
    // Piece landed
    mergePieceToBoard();
    clearLines();
    currentPiece.value = spawnPiece();
    if (checkCollision(currentPiece.value.x, currentPiece.value.y, currentPiece.value.shape)) {
      gameOver.value = true;
      clearInterval(dropInterval as number);
      alert('Game Over!');
    }
  }
};

const checkCollision = (x: number, y: number, shape: number[][]): boolean => {
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (
        shape[row][col] !== EMPTY_CELL &&
        (y + row >= BOARD_HEIGHT ||
          x + col < 0 ||
          x + col >= BOARD_WIDTH ||
          board.value[y + row][x + col] !== EMPTY_CELL)
      ) {
        return true;
      }
    }
  }
  return false;
};

const mergePieceToBoard = () => {
  if (!currentPiece.value) return;

  currentPiece.value.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== EMPTY_CELL) {
        board.value[currentPiece.value!.y + y][currentPiece.value!.x + x] = currentPiece.value.color;
      }
    });
  });
};

const clearLines = () => {
  let linesCleared = 0;
  for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
    if (board.value[y].every((cell) => cell !== EMPTY_CELL)) {
      // Line is full, clear it
      board.value.splice(y, 1);
      board.value.unshift(Array(BOARD_WIDTH).fill(EMPTY_CELL));
      linesCleared++;
      y++; // Check the same line again as it's now a new line
    }
  }
  if (linesCleared > 0) {
    score.value += linesCleared * 100 * level.value;
    level.value = Math.floor(score.value / 1000) + 1;
    if (dropInterval) {
      clearInterval(dropInterval);
      dropInterval = window.setInterval(drop, 1000 / level.value);
    }
  }
};

const movePiece = (dir: number) => {
  if (!currentPiece.value || gameOver.value) return;

  const newX = currentPiece.value.x + dir;
  if (!checkCollision(newX, currentPiece.value.y, currentPiece.value.shape)) {
    currentPiece.value.x = newX;
  }
};

const rotatePiece = () => {
  if (!currentPiece.value || gameOver.value) return;

  const rotatedShape = rotate(currentPiece.value.shape, 1);
  if (!checkCollision(currentPiece.value.x, currentPiece.value.y, rotatedShape)) {
    currentPiece.value.shape = rotatedShape;
  }
};

const handleKeyPress = (e: KeyboardEvent) => {
  if (gameOver.value) return;

  switch (e.key) {
    case 'ArrowLeft':
      movePiece(-1);
      break;
    case 'ArrowRight':
      movePiece(1);
      break;
    case 'ArrowDown':
      drop();
      break;
    case 'ArrowUp':
      rotatePiece();
      break;
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
  if (dropInterval) {
    clearInterval(dropInterval);
  }
});

// Initial render of the board (empty)
// This will be updated when the game starts
</script>

<style scoped>
.tetris-app {
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #333;
  color: #eee;
  font-family: monospace;
}

.game-board {
  display: grid;
  grid-template-rows: repeat(20, 1fr);
  grid-template-columns: repeat(10, 1fr);
  width: calc(20 * 10px); /* Cell size * BOARD_WIDTH */
  height: calc(20 * 20px); /* Cell size * BOARD_HEIGHT */
  border: 2px solid #666;
  margin: 20px;
}

.row {
  display: contents;
}

.cell {
  width: 20px;
  height: 20px;
  border: 1px solid #555;
  box-sizing: border-box;
}

.cell.empty {
  background-color: #333;
}

.cell.filled {
  background-color: #eee; /* Placeholder, will be overridden by piece color */
}

.game-info {
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.game-info h3 {
  margin: 0;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
