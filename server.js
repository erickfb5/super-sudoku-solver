require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const runner = require("./tests/test-runner.js");
const { loggerMiddleware, notFoundMiddleware } = require("./middlewares/");
const { rootRoutes, sudokuRoutes, testingRoutes } = require("./routes");

const app = express();

app.use(loggerMiddleware);

app.use("/public", express.static(process.cwd() + "/public"));
app.use(cors({ origin: "*" })); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/_api', testingRoutes);

app.use(rootRoutes)
app.use(sudokuRoutes)
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 5000;
  const listener = app.listen(PORT, () => {
    console.log(`🟢 🟢 🟢 ⮕  Server running on port ${listener.address().port} 🏃`);
    if (process.env.NODE_ENV === "test") {
      console.log("🟢 🟢 🟢 ⮕  Running Tests... 🧪");
      setTimeout(() => {
        try {
          runner.run();
        } catch (err) {
          console.log("🔴 🔴 🔴 ⮕  Tests are not valid:", err);
          console.error(err);
        }
      }, 5000);
    }
  });

module.exports = app;