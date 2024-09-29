const express = require("express");
const router = express.Router();
const { register, loginToken  } = require("../controllers/UserController");

router.post("/register", register);
router.post("/loginToken", loginToken);

module.exports = router;