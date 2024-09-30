const express = require("express");
const router = express.Router();
const { register, loginToken, checkIfUserExist  } = require("../controllers/UserController");

router.post("/checkIfUserExist", checkIfUserExist);
router.post("/register", register);
router.post("/loginToken", loginToken);

module.exports = router;