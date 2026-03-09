const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
      getTransactions,
      getTransactionById
} = require("../controllers/transactionController");

router.get("/", authMiddleware, getTransactions);

router.get("/:id", authMiddleware, getTransactionById);

module.exports = router;