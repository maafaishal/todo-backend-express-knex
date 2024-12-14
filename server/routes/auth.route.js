const { Router } = require("express");

const authControllers = require("../controllers/auth.controller");

const router = Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);

module.exports = router;
