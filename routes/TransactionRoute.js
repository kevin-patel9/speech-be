const express = require("express");
const { createTransaction, getTotalExpense, getWeekExpense, getDataListForSubCategory } = require("../controllers/TransactionController");
const { isAuth } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/createTransaction", isAuth, createTransaction);
router.get("/getTotalExpense", isAuth, getTotalExpense);
router.get("/getWeekExpense", isAuth, getWeekExpense);
router.post("/getDataListForSubCategory", isAuth, getDataListForSubCategory);

module.exports = router;