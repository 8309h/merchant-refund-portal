const Transaction = require("../models/Transaction");
const Refund = require("../models/Refund");
const StatusEvent = require("../models/StatusEvent");

exports.createRefund = async (req, res) => {
      try {

            const { transactionId, amount, reason } = req.body;

            //  Find transaction
            const transaction = await Transaction.findOne({
                  transactionId,
                  merchantId: req.user.id
            });

            if (!transaction) {
                  return res.status(404).json({
                        success: false,
                        message: "Transaction not found"
                  });
            }

            //  Check status
            if (transaction.status !== "Successful") {
                  return res.status(400).json({
                        success: false,
                        message: "Only successful transactions can be refunded"
                  });
            }

            // Check refund already exists
            const existingRefund = await Refund.findOne({ transactionId });

            if (existingRefund) {
                  return res.status(400).json({
                        success: false,
                        message: "Refund already processed for this transaction"
                  });
            }

            //  Check refund within 30 days
            const transactionDate = new Date(transaction.createdAt);
            const today = new Date();

            const diffDays = (today - transactionDate) / (1000 * 60 * 60 * 24);

            if (diffDays > 30) {
                  return res.status(400).json({
                        success: false,
                        message: "Refund allowed only within 30 days of transaction"
                  });
            }

            //  Validate refund amount
            if (amount > transaction.amount) {
                  return res.status(400).json({
                        success: false,
                        message: "Refund amount cannot exceed original transaction amount"
                  });
            }

            //  Create refund
            const refund = await Refund.create({
                  transactionId,
                  merchantId: transaction.merchantId,
                  refundAmount: amount,
                  reason
            });

            // Update transaction status
            transaction.status = "Refunded";
            await transaction.save();

            // Add status timeline event
            await StatusEvent.create({
                  transactionId: transaction.transactionId,
                  status: "Refunded"
            });

            res.status(201).json({
                  success: true,
                  message: "Refund created successfully",
                  data: refund
            });

      } catch (error) {

            res.status(500).json({
                  success: false,
                  message: error.message
            });

      }
};