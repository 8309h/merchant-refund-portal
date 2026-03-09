const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { createRefund } = require("../controllers/refundController");

router.post("/", authMiddleware, createRefund);

module.exports = router;