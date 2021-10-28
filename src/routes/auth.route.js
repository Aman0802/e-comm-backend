const router = require("express").Router();

const {
  loginController,
  registerController,
} = require("../controllers/auth.controller");

router.post("/login", loginController);
router.post("/register", registerController);

module.exports = router;
