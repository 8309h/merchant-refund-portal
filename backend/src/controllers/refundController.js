const Transaction = require("../models/Transaction");
const Refund = require("../models/Refund");
const StatusEvent = require("../models/StatusEvent");

exports.createRefund = async (req, res) => {
      try {

            const { transactionId, amount, reason } = req.body;

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

            if (transaction.status !== "Successful") {
                  return res.status(400).json({
                        success: false,
                        message: "Only successful transactions can be refunded"
                  });
            }

            const existingRefund = await Refund.findOne({ transactionId });

            if (existingRefund) {
                  return res.status(400).json({
                        success: false,
                        message: "Refund already exists"
                  });
            }

            const refund = await Refund.create({
                  transactionId,
                  merchantId: transaction.merchantId,
                  refundAmount: amount,
                  reason,
                  status: "Requested"
            });

            await StatusEvent.create({
                  transactionId,
                  status: "Refund Requested"
            });

            res.status(201).json({
                  success: true,
                  data: refund
            });

      } catch (error) {

            res.status(500).json({
                  success: false,
                  message: error.message
            });

      }
};
exports.updateRefundStatus = async (req, res) => {
      try {

            const { id } = req.params;
            const { status } = req.body;

            const refund = await Refund.findById(id);

            if (!refund) {
                  return res.status(404).json({
                        success: false,
                        message: "Refund not found"
                  });
            }

            refund.status = status;

            await refund.save();

            await StatusEvent.create({
                  transactionId: refund.transactionId,
                  status: `Refund ${status}`
            });

            if (status === "Completed") {

                  await Transaction.updateOne(
                        { transactionId: refund.transactionId },
                        { status: "Refunded" }
                  );

            }

            res.json({
                  success: true,
                  data: refund
            });

      } catch (error) {

            res.status(500).json({
                  success: false,
                  message: error.message
            });

      }
};

exports.getRefunds = async (req, res) => {
      try {

            const page = parseInt(req.query.page) || 1;
            const limit = 10;

            const query = {
                  merchantId: req.user.id
            };

            const refunds = await Refund.find(query)
                  .sort({ createdAt: -1 })
                  .skip((page - 1) * limit)
                  .limit(limit);

            const total = await Refund.countDocuments(query);

            res.status(200).json({
                  success: true,
                  data: refunds,
                  pagination: {
                        total,
                        page,
                        pageSize: limit,
                        totalPages: Math.ceil(total / limit)
                  }
            });

      } catch (error) {

            res.status(500).json({
                  success: false,
                  message: error.message
            });

      }
};