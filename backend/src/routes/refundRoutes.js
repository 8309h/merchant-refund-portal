const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
      createRefund,
      updateRefundStatus,
      getRefunds
} = require("../controllers/refundController");

router.post("/", authMiddleware, createRefund);

router.patch("/:id/status", authMiddleware, updateRefundStatus);

router.get("/", authMiddleware, getRefunds);

module.exports = router;