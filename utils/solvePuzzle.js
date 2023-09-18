const { checkRowPlacement, checkColPlacement, checkRegionPlacement } = require("./validatePlacement");

const emptyTileHasNoMoves = (remainingMoves) => {
  const emptyTilePositions = Object.entries(remainingMoves).sort((a, b) => a[1].size - b[1].size);

  return (emptyTilePositions.length === 0) ? false : emptyTilePositions[0][1].size === 0;
};

const updateRemainingMoves = (nextMoveIndex, value, remainingMoves) => {
  const newRemainingMoves = {};

  Object.keys(remainingMoves).forEach((index) => {
    if (index === nextMoveIndex) return;

    newRemainingMoves[index] = new Set(remainingMoves[index]);

    if (newRemainingMoves[index].has(value)) {
      const moveRow = Math.floor(nextMoveIndex / 9);
      const currRow = Math.floor(index / 9);

      const moveCol = nextMoveIndex % 9;
      const currCol = index % 9;

      const moveTile = Math.floor(moveRow / 3) * 3 + Math.floor(moveCol / 3);
      const currTile = Math.floor(currRow / 3) * 3 + Math.floor(currCol / 3);

      if (moveRow === currRow || moveCol === currCol || moveTile === currTile) {
        newRemainingMoves[index].delete(value);
      }
    }
  });

  return newRemainingMoves;
};

const getRemainingMoves = (puzzleArray) => {
  const validMovesArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const remainingMoves = {};

  for (let index = 0; index < 81; index += 1) {
    remainingMoves[index] = new Set(validMovesArr);
  }

  for (let index = 0; index < 81; index += 1) {
    if (puzzleArray[index] !== ".") {
      const usedValue = puzzleArray[index];
      remainingMoves[index] = new Set();

      const rowIndex = Math.floor(index / 9);
      const colIndex = index - rowIndex * 9;

      const regionRowIndex = Math.floor(rowIndex / 3) * 3;
      const regionColIndex = Math.floor(colIndex / 3) * 3;

      for (let i = 0; i < 9; i += 1) {
        const rowPosition = rowIndex * 9 + i;
        remainingMoves[rowPosition].delete(usedValue);

        const colPosition = i * 9 + colIndex;
        remainingMoves[colPosition].delete(usedValue);

        const regionPosition =
          (Math.floor(i / 3) + regionRowIndex) * 9 + (i % 3) + regionColIndex;
        remainingMoves[regionPosition].delete(usedValue);
      }
    }
  }

  return Object.keys(remainingMoves).reduce((accum, index) => {
    if (puzzleArray[index] === ".") accum[index] = remainingMoves[index];
    return accum;
  }, {});
};


const findSolution = (puzzleArray, remainingMoves) => {
  if (Object.keys(remainingMoves).length === 0) return puzzleArray.join("");

  const [nextMoveIndex, moveSet] = Object.entries(remainingMoves).sort(
    (a, b) => a[1].size - b[1].size
  )[0];
  const moveArr = Array.from(moveSet);

  for (const value of moveArr) {
    const newRemainingMoves = updateRemainingMoves(
      nextMoveIndex,
      value,
      remainingMoves
    );

    if (emptyTileHasNoMoves(newRemainingMoves)) continue;

    puzzleArray[nextMoveIndex] = value;

    const result = findSolution(puzzleArray, newRemainingMoves);
    if (result) return result;
  }

  puzzleArray[nextMoveIndex] = ".";
  return false;
};

const validTileValues = (puzzleString) => {
  for (let index = 0; index < 81; index += 1) {
    const row = Math.floor(index / 9);
    const col = index % 9;
    const args = [puzzleString, row, col, puzzleString[index]];
    if (!(checkRowPlacement(...args) && checkColPlacement(...args) && checkRegionPlacement(...args))) {
      return false;
    }
  }
  return true;
};

const solvePuzzle = (puzzleString) => {
  const puzzleArray = puzzleString.split("");
  const remainingMoves = getRemainingMoves(puzzleArray);
  return !validTileValues(puzzleString)
    ? false
    : emptyTileHasNoMoves(remainingMoves)
    ? false
    : findSolution(puzzleArray, remainingMoves);
};

module.exports = { solvePuzzle };