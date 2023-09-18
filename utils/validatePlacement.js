const checkRowPlacement = (puzzleString, row, column, value) => {
    const positionIndex = row * 9 + column;
  
    for (let checkCol = 0; checkCol < 9; checkCol += 1) {
      const checkPosition = row * 9 + checkCol;
      if (checkPosition === positionIndex || puzzleString[checkPosition] === ".") continue;
      if (puzzleString[checkPosition] === value) return false;
    }
  
    return true;
  };
  
  const checkColPlacement = (puzzleString, row, column, value) => {
    const positionIndex = row * 9 + column;
  
    for (let checkRow = 0; checkRow < 9; checkRow += 1) {
      const checkPosition = checkRow * 9 + column;
  
      if (checkPosition === positionIndex || puzzleString[checkPosition] === ".") continue;
      if (puzzleString[checkPosition] === value) return false;
    }
  
    return true;
  };
  const checkRegionPlacement = (puzzleString, row, column, value) => {
    const positionIndex = row * 9 + column;
    const regionStartRow = Math.floor(row / 3) * 3;
    const regionStartCol = Math.floor(column / 3) * 3;
  
    for (let checkRow = regionStartRow; checkRow < regionStartRow + 3; checkRow += 1) {
      for (let checkCol = regionStartCol; checkCol < regionStartCol + 3; checkCol += 1) {
        const checkPosition = checkRow * 9 + checkCol;
        if (checkPosition === positionIndex || puzzleString[checkPosition] === ".") continue;
        if (puzzleString[checkPosition] === value) return false
      }
    }
  
    return true;
  };
  
  const validatePlacement = (puzzleString, coordinate, value) => {
      const rowCharToIndex = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8 };
      const row = rowCharToIndex[coordinate[0]];
      const col = coordinate[1] - 1;
      const result = { valid: true };
    
      if (!checkRowPlacement(puzzleString, row, col, value)) {
        result.conflict = ["row"];
        result.valid = false;
      }
    
      if (!checkColPlacement(puzzleString, row, col, value)) {
        result.conflict = result.conflict || [];
        result.conflict.push("column");
        result.valid = false;
      }
    
      if (!checkRegionPlacement(puzzleString, row, col, value)) {
        result.conflict = result.conflict || [];
        result.conflict.push("region");
        result.valid = false;
      }
    
      return result;
    };
  
  module.exports = { checkRowPlacement, checkColPlacement, checkRegionPlacement, validatePlacement };