"use strict";

const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => res.sendFile(process.cwd() + "/views/index.html"));

module.exports = router;