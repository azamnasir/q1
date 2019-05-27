const express = require("express");
const otherRouter = express.Router();

otherRouter.get("/*", (req, res, next) => {
  res.status(404).send();
});
otherRouter.post("/*", (req, res, next) => {
  res.status(404).send();
});

module.exports = otherRouter;
