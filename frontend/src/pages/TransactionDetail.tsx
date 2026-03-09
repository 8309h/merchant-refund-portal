import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function TransactionDetail() {

      const { id } = useParams();

      const [transaction, setTransaction] = useState<any>(null);
      const [timeline, setTimeline] = useState<any[]>([]);
      const [loading, setLoading] = useState(true);

      const [refundAmount, setRefundAmount] = useState("");
      const [reason, setReason] = useState("");
      const [showRefund, setShowRefund] = useState(false);

      useEffect(() => {

            const fetchTransaction = async () => {

                  try {

                        const res = await API.get(`/transactions/${id}`);

                        setTransaction(res.data.data.transaction);
                        setTimeline(res.data.data.timeline);

                  } catch (error) {
                        console.error(error);
                  }

                  setLoading(false);

            };

            fetchTransaction();

      }, [id]);

      const handleRefund = async () => {

            try {

                  await API.post("/refunds", {
                        transactionId: transaction.transactionId,
                        amount: Number(refundAmount),
                        reason
                  });

                  alert("Refund created successfully");

                  setShowRefund(false);

            } catch (error: any) {

                  alert(error.response?.data?.message || "Refund failed");

            }

      };

      if (loading) return <h2>Loading...</h2>;

      if (!transaction) return <h2>Transaction not found</h2>;

      return (
            <div className="container">

                  <h2>Transaction Detail</h2>

                  <p><b>Transaction ID:</b> {transaction.transactionId}</p>
                  <p><b>Amount:</b> {transaction.amount}</p>
                  <p><b>Status:</b> {transaction.status}</p>

                  {/* Refund Button */}

                  {transaction.status === "Successful" && (
                        <button
                              style={{ marginTop: "10px" }}
                              onClick={() => setShowRefund(true)}
                        >
                              Raise Refund
                        </button>
                  )}

                  {/* Refund Form */}

                  {showRefund && (

                        <div style={{ marginTop: "20px" }}>

                              <h3>Refund Request</h3>

                              <input
                                    placeholder="Refund Amount"
                                    value={refundAmount}
                                    onChange={(e) => setRefundAmount(e.target.value)}
                              />

                              <br /><br />

                              <input
                                    placeholder="Reason"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                              />

                              <br /><br />

                              <button onClick={handleRefund}>
                                    Submit Refund
                              </button>

                        </div>

                  )}

                  {/* Timeline */}

                  <h3 style={{ marginTop: "30px" }}>Status Timeline</h3>

                  {timeline.map((event, index) => (
                        <div key={index}>
                              <p>{event.status}</p>
                              <small>
                                    {new Date(event.createdAt).toLocaleString()}
                              </small>
                        </div>
                  ))}

            </div>
      );
}

export default TransactionDetail;