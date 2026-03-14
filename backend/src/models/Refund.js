const mongoose = require("mongoose");

const RefundSchema = new mongoose.Schema({

      transactionId: {
            type: String,
            required: true
      },

      merchantId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
      },

      refundAmount: {
            type: Number,
            required: true
      },

      reason: {
            type: String,
            required: true
      },

      status: {
            type: String,
            enum: [
                  "Requested",
                  "Processing",
                  "Approved",
                  "Rejected",
                  "Completed"
            ],
            default: "Requested"
      },

      createdAt: {
            type: Date,
            default: Date.now
      }

});

module.exports = mongoose.model("Refund", RefundSchema);