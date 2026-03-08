const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
      merchantId: mongoose.Schema.Types.ObjectId,
      transactionId: String,
      amount: Number,
      status: {
            type: String,
            enum: ["Successful", "Failed", "Pending", "Refunded"]
      },
      createdAt: Date
});

module.exports = mongoose.model("Transaction", TransactionSchema);