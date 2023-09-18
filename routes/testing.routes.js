"use strict";

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const runner = require("../tests/test-runner.js");
const router = express.Router();

// Route for '/_api/server.js'
router.get("/server.js", (req, res, next) => {
  console.log("requested");
  fs.readFile(__dirname + "/server.js", (err, data) => {
    if (err) return next(err);
    res.send(data.toString());
  });
});

// Route for '/_api/routes/api.js'
router.get("/api.js", (req, res, next) => {
  console.log("requested");
  fs.readFile(__dirname + "/routes/api.js", (err, data) => {
    if (err) return next(err);
    res.type("txt").send(data.toString());
  });
});

// Route for '/_api/controllers/convertHandler.js'
router.get("/convertHandler.js", (req, res, next) => {
  console.log("requested");
  fs.readFile(__dirname + "/controllers/convertHandler.js", (err, data) => {
    if (err) return next(err);
    res.type("txt").send(data.toString());
  });
});

// Route for '/_api/get-tests'
router.get(
  "/get-tests",
  cors(),
  (req, res, next) => {
    console.log("requested");
    if (process.env.NODE_ENV === "test") return next();
    res.json({ status: "unavailable" });
  },
  (req, res, next) => {
    if (!runner.report) return next();
    res.json(testFilter(runner.report, req.query.type, req.query.n));
  },
  (req, res) => {
    runner.on("done", (report) => {
      process.nextTick(() =>
        res.json(testFilter(runner.report, req.query.type, req.query.n))
      );
    });
  }
);

// Route for '/_api/app-info'
router.get("/app-info", (req, res) => {
  let hs = Object.keys(res._headers).filter(
    (h) => !h.match(/^access-control-\w+/)
  );
  let hObj = {};
  hs.forEach((h) => {
    hObj[h] = res._headers[h];
  });
  delete res._headers["strict-transport-security"];
  res.json({ headers: hObj });
});

const testFilter = (tests, type, n) => {
  let out;
  switch (type) {
    case "unit":
      out = tests.filter((t) => t.context.match("Unit Tests"));
      break;
    case "functional":
      out = tests.filter(
        (t) => t.context.match("Functional Tests") && !t.title.match("#example")
      );
      break;
    default:
      out = tests;
  }
  return n !== undefined ? out[n] || out : out;
};

module.exports = router;
