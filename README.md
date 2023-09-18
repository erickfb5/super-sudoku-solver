# **[Super Sudoku Solver](https://eb-super-sudoku-solver.onrender.com)**

A full-stack JavaScript application for solving Sudoku puzzles. This application is built using [Node.js](https://nodejs.org/en/about), and [Express.js](https://expressjs.com/)

## Table of Contents

- [Features](#features)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- Solve Sudoku puzzles by entering the puzzle in the text area and clicking the "Solve" button.
- Check the placement of a number in the Sudoku grid by entering the coordinate and value and clicking the "Check Placement" button.

## File Structure
The application's file structure includes the following **key** files and directories:

- `server.js`: Main entry point of the application. It sets up and configures the Express.js server, defines routes, and starts the server.
- `controllers/checkPlacement.js`: Controller for checking the placement of Sudoku numbers.
- `controllers/solveSudoku.js`: Controller for solving Sudoku puzzles.
- `middlewares/logger.js`: Middleware for logging incoming HTTP requests.
- `middlewares/notFound.js`: Middleware for handling 404 Not Found errors.
- `routes/root.routes.js`: Defines routes for serving static files.
- `routes/sudoku.routes.js`: Defines routes for Sudoku-related functionality.
- `routes/testing.routes.js`: Defines routes for testing and providing information about the app.
- `tests/assertion-analyser.js`: Module for analyzing test assertions.
- `tests/functional-tests.js`: Contains functional tests written using Mocha and Chai.
- `tests/test-runner.js`: Module for running tests.
- `tests/unit-tests.js`: Contains unit tests.

## Installation
To run the [Super Sudoku Solver](https://eb-super-sudoku-solver.onrender.com) locally, follow these steps:
1. Clone this repository to your local machine using:
    ```bash
    git clone https://github.com/erickfb5/super-sudoku-solver.git
2. Navigate to the project directory:
   ```bash
   cd personal-library-app
3. Install the required dependencies:
   ```bash
   npm install
4. Rename the `sample.env` file to `.env` and update the required environment variables.   
5. Start the server:
   ```bash
   npm start
## Usage
Once the server is running, you can use the [Super Sudoku Solver](https://eb-super-sudoku-solver.onrender.com) by opening your web browser and navigating to the **http://localhost:```PORT```/** defined in the ```.env``` file.

## Technologies Used
The [Super Sudoku Solver](https://eb-super-sudoku-solver.onrender.com) utilizes the technologies and dependencies listed below to deliver its functionality:

- [Node.js](https://nodejs.org/en/about)
- [Express.js](https://expressjs.com)
- [Chai](https://www.chaijs.com/)
- [Date-fns](https://date-fns.org)

## Testing
The application includes a comprehensive testing suite with both _functional_ and _unit_ tests:

To run the tests, you can use the following command: **```npm test```**

## Contributing
If you would like to contribute to this project, please follow these guidelines:

- Fork the repository on GitHub.
- Make your changes and commit them to your fork.
- Create a pull request from your fork to this repository. 

# License
This project is licensed under the **[MIT License](https://spdx.org/licenses/MIT.html)**.