const validatePuzzle = (puzzleString) => {
  return puzzleString.length !== 81
    ? [false, { error: "Expected puzzle to be 81 characters long" }]
    : !/[1-9\.]{81}/.test(puzzleString)
    ? [false, { error: "Invalid characters in puzzle" }]
    : [true, {}];
};

module.exports = { validatePuzzle };