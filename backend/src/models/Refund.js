const mongoose = require("mongoose");

const RefundSchema = new mongoose.Schema({
      transactionId: String,
      merchantId: mongoose.Schema.Types.ObjectId,
      refundAmount: Number,
      reason: String,
      createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Refund", RefundSchema);