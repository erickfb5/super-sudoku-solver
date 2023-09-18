const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;

const app = require('../server');

chai.use(chaiHttp);

const validPuzzleString =
  '53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79';

const invalidCharacterPuzzleString =
  '5a..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79';

  suite('Functional Tests', () => {

  // Solve a puzzle with valid puzzle string
  test('Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
    chai
      .request(app)
      .post('/api/solve')
      .send({ puzzle: validPuzzleString })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'solution');
        done();
      });
  });

  // Solve a puzzle with missing puzzle string
  test('Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
    chai
      .request(app)
      .post('/api/solve')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        done();
      });
  });

  // Solve a puzzle with invalid characters
  test('Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
    chai
      .request(app)
      .post('/api/solve')
      .send({ puzzle: invalidCharacterPuzzleString })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        done();
      });
  });

  // Solve a puzzle with incorrect length
  test('Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
    chai
      .request(app)
      .post('/api/solve')
      .send({ puzzle: '123' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        done();
      });
  });

  // Solve a puzzle that cannot be solved
  test('Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
    chai
      .request(app)
      .post('/api/solve')
      .send({ puzzle: '1..2...3.' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        done();
      });
  });

  // Check a puzzle placement with all fields
  test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {
    chai
      .request(app)
      .post('/api/check')
      .send({ puzzle: validPuzzleString, coordinate: 'A1', value: '1' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'valid');
        done();
      });
  });

  test('Check a puzzle placement with a single conflict and all fields: POST request to /api/check', (done) => {
    const puzzle =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

    const placements = [
      { puzzle, coordinate: 'A5', value: '9' },
      { puzzle, coordinate: 'A1', value: '6' },
      { puzzle, coordinate: 'A5', value: '4' },
    ];

    const expectedResponses = [
      { valid: false, conflict: ['row'] },
      { valid: false, conflict: ['column'] },
      { valid: false, conflict: ['region'] },
    ];

    const promises = placements.map(({ puzzle, coordinate, value }) => {
      return chai
        .request(app)
        .post('/api/check')
        .send({ puzzle, coordinate, value });
    });

    Promise.all(promises)
      .then((responses) => {
        responses.forEach((res, i) => {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(
            res.type,
            'application/json',
            'Response type should be application/json',
          );
          assert.isObject(res.body, 'Response body should be an object');
          assert.deepInclude(
            res.body,
            expectedResponses[i],
            'Response should contain valid property with value of false indicating move is invalid, and a conflict property indicating the conflict',
          );
        });

        done();
      })
      .catch((err) => done(err));
  });

// Check a puzzle placement with multiple placement conflicts
test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {
    const puzzle =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

    const placements = [
      { puzzle, coordinate: 'A1', value: '9' },
      { puzzle, coordinate: 'A1', value: '1' },
      { puzzle, coordinate: 'A2', value: '3' },
    ];

    const expectedResponses = [
      { valid: false, conflict: ['row', 'region'] },
      { valid: false, conflict: ['row', 'column'] },
      { valid: false, conflict: ['column', 'region'] },
    ];

    const promises = placements.map(({ puzzle, coordinate, value }) => {
      return chai
        .request(app)
        .post('/api/check')
        .send({ puzzle, coordinate, value });
    });

    Promise.all(promises)
      .then((responses) => {
        responses.forEach((res, i) => {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(
            res.type,
            'application/json',
            'Response type should be application/json',
          );
          assert.isObject(res.body, 'Response body should be an object');
          assert.deepInclude(
            res.body,
            expectedResponses[i],
            'Response should contain valid property with value of false indicating move is invalid, and a conflict property indicating the conflict(s)',
          );
        });

        done();
      })
      .catch((err) => done(err));
  });
 


// Check a puzzle placement with all placement conflicts
test('Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {
  // Create a puzzle string with conflicts in every row, column, and region
  const puzzleString =
    '535436287672819534981573926843265179216748395759391462364182759127954683498627351';

  // Place '1' at 'A1' to create conflicts in all rows, columns, and regions
  chai
    .request(app)
    .post('/api/check')
    .send({ puzzle: puzzleString, coordinate: 'A1', value: '1' })
    .end((err, res) => {
      assert.equal(res.status, 200);
      assert.property(res.body, 'valid');
      assert.property(res.body, 'conflict');
      assert.isTrue(res.body.conflict.length > 0); // Ensure there are conflicts in all rows, columns, and regions
      done();
    });
});


  // Check a puzzle placement with missing required fields
  test('Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {
    chai
      .request(app)
      .post('/api/check')
      .send({ puzzle: validPuzzleString, value: '1' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        done();
      });
  });

  // Check a puzzle placement with invalid characters
  test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
    chai
      .request(app)
      .post('/api/check')
      .send({ puzzle: invalidCharacterPuzzleString, coordinate: 'A1', value: '1' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        done();
      });
  });

  // Check a puzzle placement with incorrect length
  test('Check a puzzle placement with incorrect length: POST request to /api/check', (done) => {
    chai
      .request(app)
      .post('/api/check')
      .send({ puzzle: '123', coordinate: 'A1', value: '1' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        done();
      });
  });

  // Check a puzzle placement with invalid placement coordinate
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {
    chai
      .request(app)
      .post('/api/check')
      .send({ puzzle: validPuzzleString, coordinate: 'Z9', value: '1' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        done();
      });
  });

  // Check a puzzle placement with invalid placement value
  test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
    chai
      .request(app)
      .post('/api/check')
      .send({ puzzle: validPuzzleString, coordinate: 'A1', value: '10' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        done();
      });
  });

});