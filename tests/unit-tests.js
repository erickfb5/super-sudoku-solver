const chai = require("chai");
const assert = chai.assert;

const { validatePuzzle, solvePuzzle } = require("../utils");
const { checkRowPlacement, checkColPlacement, checkRegionPlacement } = require("../utils/validatePlacement");

suite("Unit Tests", () => {
  suite("Solver Tests", function () {

    test("Logic handles a valid puzzle string of 81 characters", (done) => {
      let valid, err;

      [valid, err] = validatePuzzle(".".repeat(81));
      assert.isTrue(valid, "puzzleString should be validated");
      assert.deepEqual(err, {}, "No error should be returned");
      
      done();
    });

    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
      const expectedError = {
        error: "Invalid characters in puzzle",
      };
      let valid, err;

      [valid, err] = validatePuzzle("a".repeat(81));
      assert.isFalse(valid, "puzzleString is not valid");
      assert.deepEqual(
        err,
        expectedError,
        "Invalid puzzle characters error should be returned"
      );
    });

    test("Logic handles a puzzle string that is not 81 characters in length", () => {
      const expectedError = {
        error: "Expected puzzle to be 81 characters long",
      };
      let valid, err;

      [valid, err] = validatePuzzle(".");
      assert.isFalse(valid, "puzzleString is not valid");
      assert.deepEqual(
        err,
        expectedError,
        "Incorrect puzzle length error should be returned"
      );

    });


    test("Logic handles a valid row placement", () => {
      const puzzleStr =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let result;

      result = checkRowPlacement(puzzleStr, 0, 0, "7");
      assert.isTrue(result);
    });

    test("Logic handles an invalid row placement", () => {
      const puzzleStr =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let result;

      result = checkRowPlacement(puzzleStr, 0, 8, "5");
      assert.isFalse(result);

      // result = checkRowPlacement(puzzleStr, 7, 4, "7");
      // assert.isFalse(result);

      // result = checkRowPlacement(puzzleStr, 3, 6, "6");
      // assert.isFalse(result);

      // // Test replacing existing value with invalid value
      // result = checkRowPlacement(puzzleStr, 5, 8, "1");
      // assert.isFalse(result);
    });

    test("Logic handles a valid column placement", () => {
      const puzzleStr =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let result;

      result = checkColPlacement(puzzleStr, 0, 0, "7");
      assert.isTrue(result);

      // result = checkColPlacement(puzzleStr, 4, 4, "4");
      // assert.isTrue(result);

      // result = checkColPlacement(puzzleStr, 7, 6, "8");
      // assert.isTrue(result);

      // // Test replacing existing value with valid value
      // result = checkColPlacement(puzzleStr, 5, 8, "5");
      // assert.isTrue(result);
    });

    test("Logic handles an invalid column placement", () => {
      const puzzleStr =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let result;

      result = checkColPlacement(puzzleStr, 2, 8, "2");
      assert.isFalse(result);

      // result = checkColPlacement(puzzleStr, 5, 5, "9");
      // assert.isFalse(result);

      // result = checkColPlacement(puzzleStr, 8, 0, "5");
      // assert.isFalse(result);

      // // Test replacing existing value with invalid value
      // result = checkColPlacement(puzzleStr, 5, 8, "7");
      // assert.isFalse(result);
    });

    test("Logic handles a valid region (3x3 grid) placement", () => {
      const puzzleStr =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let result;

      result = checkRegionPlacement(puzzleStr, 0, 0, "7");
      assert.isTrue(result);

      // result = checkRegionPlacement(puzzleStr, 4, 4, "4");
      // assert.isTrue(result);

      // result = checkRegionPlacement(puzzleStr, 7, 6, "8");
      // assert.isTrue(result);

      // // Test replacing existing value with valid value
      // result = checkRegionPlacement(puzzleStr, 5, 8, "5");
      // assert.isTrue(result);
    });

    test("Logic handles an invalid region (3x3 grid) placement", () => {
      const puzzleStr =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let result;

      result = checkRegionPlacement(puzzleStr, 0, 0, "2");
      assert.isFalse(result);

      // result = checkRegionPlacement(puzzleStr, 2, 5, "5");
      // assert.isFalse(result);

      // result = checkRegionPlacement(puzzleStr, 8, 7, "7");
      // assert.isFalse(result);

      // // Test replacing existing value with invalid value
      // result = checkRegionPlacement(puzzleStr, 7, 5, "3");
      // assert.isFalse(result);
    });

    test("Valid puzzle strings pass the solver", () => {
      const puzzleStr =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let result;

      result = solvePuzzle(puzzleStr);
      assert.isString(result);
      assert.equal(result.length, 81);
      assert.isTrue(/[1-9]{81}/.test(result));
      assert.isTrue(true);
    });

    test("Invalid puzzle strings fail the solver", () => {
      let invalidPuzzleStr =
        "2.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let result;

      result = solvePuzzle(invalidPuzzleStr);
      assert.isFalse(result);

    });

    test("Solver returns the expected solution for an incomplete puzzle", () => {
      let puzzleStr, solution;
      // Normal Solvable Puzzle
      puzzleStr =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      solution =
        "769235418851496372432178956174569283395842761628713549283657194516924837947381625";
      let result;

      result = solvePuzzle(puzzleStr);
      assert.isString(result);
      assert.equal(result.length, 81);
      assert.isTrue(/[1-9]{81}/.test(result));
      assert.equal(result, solution);
    });
  });
});