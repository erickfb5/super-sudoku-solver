const { validatePuzzle, validatePlacement } = require("../utils");

const checkPlacement = (req, res) => {
  const { puzzle, coordinate, value } = req.body;

  if ([puzzle, coordinate, value].some((el) => el === '' || el === undefined)) {
    return res.json({ error: 'Required field(s) missing' });
  }

  const [valid, error] = validatePuzzle(puzzle);
  if (!valid) return res.json(error);

  if (!/^[1-9]$/.test(value)) return res.json({ error: 'Invalid value' });
  if (!/^[A-I][1-9]$/.test(coordinate)) return res.json({ error: 'Invalid coordinate' });

  const placementValidity = validatePlacement(puzzle, coordinate, value);
  return res.json(placementValidity);
}

module.exports = { checkPlacement };