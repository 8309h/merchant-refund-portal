const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
      getTransactions,
      getTransactionById,
      getAnalytics, exportTransactionsCSV
} = require("../controllers/transactionController");

router.get("/", authMiddleware, getTransactions);

router.get("/analytics", authMiddleware, getAnalytics);

router.get("/export/csv", authMiddleware, exportTransactionsCSV);

router.get("/:id", authMiddleware, getTransactionById);

module.exports = router;