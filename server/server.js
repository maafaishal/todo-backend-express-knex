const app = require("./server-config.js");
const todoRoutes = require("./routes/todo.route");

const port = process.env.PORT || 5000;

app.use("/api/todos", todoRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
