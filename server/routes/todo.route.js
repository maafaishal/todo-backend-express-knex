const { Router } = require("express");

const todoControllers = require("../controllers/todo.controller");

const router = Router();

router.get("/", todoControllers.getAllTodos);
router.get("/:id", todoControllers.getTodo);

router.post("/", todoControllers.postTodo);
router.patch("/:id", todoControllers.patchTodo);

router.delete("/", todoControllers.deleteAllTodos);
router.delete("/:id", todoControllers.deleteTodo);

module.exports = router;
