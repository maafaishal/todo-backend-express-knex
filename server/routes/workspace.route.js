const { Router } = require("express");

const workspaceControllers = require("../controllers/workspace.controller");
const authenticateMiddleware = require("../middlewares/authenticate");

const router = Router();

router.use(authenticateMiddleware);

router.get("/", workspaceControllers.getAllWorkspaces);
// router.get("/:id", workspaceControllers.getWorkspace);
// router.get("/:id/members", workspaceControllers.getAllMembers);
// router.get("/:id/boards", workspaceControllers.getAllBoards);

router.post("/", workspaceControllers.createWorkspace);
// router.put("/:id", workspaceControllers.updateWorkspace);

// router.delete("/:id", workspaceControllers.deleteWorkspace);

module.exports = router;
