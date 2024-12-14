const { Router } = require("express");

const todoControllers = require("../controllers/todo.controller");
const authenticateMiddleware = require("../middlewares/authenticate");

const router = Router();

router.use(authenticateMiddleware);

router.get("/:id", todoControllers.dummyResponse);
router.get("/:id/todos", todoControllers.dummyResponse);

router.post("/", todoControllers.dummyResponse);
router.put("/:id", todoControllers.dummyResponse);

router.delete("/:id", todoControllers.dummyResponse);

module.exports = router;
