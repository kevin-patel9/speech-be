const express = require("express");
const { createCategory, getAllCategory, getActiveSubCategory } = require("../controllers/CategoryController");
const { isAuth } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/createCategory", createCategory);
router.get("/getAllCategory", getAllCategory);
router.get("/getActiveSubCategory", isAuth, getActiveSubCategory);

module.exports = router;