const { Router } = require("express");

const boardControllers = require("../controllers/board.controller");
const authenticateMiddleware = require("../middlewares/authenticate");

const router = Router();

router.use(authenticateMiddleware);

router.get("/:id", boardControllers.dummyResponse);
router.get("/:id/todos", boardControllers.dummyResponse);

router.post("/", boardControllers.dummyResponse);
router.put("/:id", boardControllers.dummyResponse);

router.delete("/:id", boardControllers.dummyResponse);

module.exports = router;
