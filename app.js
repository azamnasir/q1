const express = require("express");

const app = express();

const appRouter = require("./api/routes/routes");

const otherRouter = require("./api/routes/other");

app.use("/I/want/title", appRouter);

app.use("/", otherRouter);

module.exports = app;
