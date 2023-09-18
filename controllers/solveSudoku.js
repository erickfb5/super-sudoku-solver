const { validatePuzzle, solvePuzzle } = require("../utils");

const solveSudoku = (req, res) => {
  const { puzzle } = req.body;
  if (!puzzle) return res.json({ error: "Required field missing" });

  const [valid, error] = validatePuzzle(puzzle);
  if (!valid) return res.json(error);

  const solution = solvePuzzle(puzzle);
  return !solution
    ? res.json({ error: "Puzzle cannot be solved" })
    : res.json({ solution });
};

module.exports = { solveSudoku };