const notFoundMiddleware = (req, res) =>
  res.status(404).type("text").send("Not Found");

module.exports = { notFoundMiddleware };