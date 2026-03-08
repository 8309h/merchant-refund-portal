const mongoose = require("mongoose");

const StatusEventSchema = new mongoose.Schema({
      transactionId: String,
      status: String,
      createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("StatusEvent", StatusEventSchema);