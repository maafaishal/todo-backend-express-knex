require("dotenv").config();
const express = require("express");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

const todoRoutes = require("./routes/todo.route");
const workspaceRoutes = require("./routes/workspace.route");
const authRoutes = require("./routes/auth.route");

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api/todos", todoRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
