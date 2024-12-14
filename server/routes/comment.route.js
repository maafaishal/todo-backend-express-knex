const { Router } = require("express");

const commentControllers = require("../controllers/comment.controller");
const authenticateMiddleware = require("../middlewares/authenticate");

const router = Router();

router.use(authenticateMiddleware);

router.get("/:id", commentControllers.dummyResponse);
router.get("/:id/todos", commentControllers.dummyResponse);

router.post("/", commentControllers.dummyResponse);
router.put("/:id", commentControllers.dummyResponse);

router.delete("/:id", commentControllers.dummyResponse);

module.exports = router;
