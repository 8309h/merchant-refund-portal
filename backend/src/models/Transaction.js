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
TransactionSchema.index({ merchantId: 1 });
TransactionSchema.index({ transactionId: 1 });
TransactionSchema.index({ status: 1 });
TransactionSchema.index({ createdAt: -1 });

TransactionSchema.index({
      merchantId: 1,
      status: 1,
      createdAt: -1
});

module.exports = mongoose.model("Transaction", TransactionSchema);