const Transaction = require("../models/Transaction");
const Refund = require("../models/Refund");
const StatusEvent = require("../models/StatusEvent");
const mongoose = require("mongoose");
const { Parser } = require("json2csv");



exports.getTransactions = async (req, res) => {
      try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;

            const { status, search, fromDate, toDate } = req.query;

            const query = {};

            // merchant isolation
            if (req.user && req.user.id) {
                  query.merchantId = req.user.id;
            }

            // status filter
            if (status && status !== "All") {
                  query.status = status;
            }

            // search transactionId
            if (search) {
                  query.transactionId = { $regex: search, $options: "i" };
            }

            // date range filter
            if (fromDate || toDate) {
                  query.createdAt = {};

                  if (fromDate) {
                        query.createdAt.$gte = new Date(fromDate);
                  }

                  if (toDate) {
                        query.createdAt.$lte = new Date(toDate);
                  }
            }

            const transactions = await Transaction.find(query)
                  .sort({ createdAt: -1 })
                  .skip((page - 1) * limit)
                  .limit(limit);

            const total = await Transaction.countDocuments(query);

            res.status(200).json({
                  success: true,
                  data: transactions,
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


/*
GET /transactions/:id
Transaction detail + timeline
*/
exports.getTransactionById = async (req, res) => {
      try {

            const { id } = req.params;

            // validate MongoDB ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                  return res.status(400).json({
                        success: false,
                        message: "Invalid transaction ID"
                  });
            }

            // find transaction belonging to logged-in merchant
            const transaction = await Transaction.findOne({
                  _id: id,
                  merchantId: req.user.id
            }).lean();

            if (!transaction) {
                  return res.status(404).json({
                        success: false,
                        message: "Transaction not found"
                  });
            }

            // fetch status timeline
            const timeline = await StatusEvent.find({
                  transactionId: transaction.transactionId
            }).sort({ createdAt: 1 });

            return res.status(200).json({
                  success: true,
                  data: {
                        transaction,
                        timeline
                  }
            });

      } catch (error) {

            return res.status(500).json({
                  success: false,
                  message: error.message
            });

      }
};

exports.getAnalytics = async (req, res) => {
      try {

            const merchantId = req.user.id;

            const totalTransactions = await Transaction.countDocuments({
                  merchantId
            });

            const successfulTransactions = await Transaction.countDocuments({
                  merchantId,
                  status: "Successful"
            });

            const failedTransactions = await Transaction.countDocuments({
                  merchantId,
                  status: "Failed"
            });

            const refundedTransactions = await Transaction.countDocuments({
                  merchantId,
                  status: "Refunded"
            });

            const refundAggregation = await Refund.aggregate([
                  {
                        $match: {
                              merchantId: new mongoose.Types.ObjectId(merchantId)
                        }
                  },
                  {
                        $group: {
                              _id: null,
                              totalRefundAmount: { $sum: "$refundAmount" }
                        }
                  }
            ]);

            const totalRefundAmount =
                  refundAggregation.length > 0
                        ? refundAggregation[0].totalRefundAmount
                        : 0;

            res.status(200).json({
                  success: true,
                  data: {
                        totalTransactions,
                        successfulTransactions,
                        failedTransactions,
                        refundedTransactions,
                        totalRefundAmount
                  }
            });

      } catch (error) {

            console.error(error);

            res.status(500).json({
                  success: false,
                  message: error.message
            });

      }
};
exports.exportTransactionsCSV = async (req, res) => {
      try {

            const merchantId = req.user.id;

            const transactions = await Transaction.find({
                  merchantId
            }).sort({ createdAt: -1 });

            const fields = [
                  "transactionId",
                  "amount",
                  "status",
                  "createdAt"
            ];

            const json2csv = new Parser({ fields });

            const csv = json2csv.parse(transactions);

            res.header("Content-Type", "text/csv");

            res.attachment("transactions.csv");

            return res.send(csv);

      } catch (error) {

            res.status(500).json({
                  success: false,
                  message: error.message
            });

      }
};