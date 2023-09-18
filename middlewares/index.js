const { loggerMiddleware } = require("./logger.js");
const { notFoundMiddleware } = require("./notFound.js");

module.exports = { loggerMiddleware, notFoundMiddleware };