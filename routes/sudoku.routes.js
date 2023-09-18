const express = require('express');
const router = express.Router();

const { checkPlacement, solveSudoku } = require('../controllers/index.js');

router.post('/api/check', checkPlacement);
router.post('/api/solve', solveSudoku);

module.exports = router;