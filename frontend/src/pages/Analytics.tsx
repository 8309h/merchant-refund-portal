import { useQuery } from "@tanstack/react-query";
import API from "../api/axios";

function Analytics() {

      const { data, isLoading } = useQuery({
            queryKey: ["analytics"],
            queryFn: async () => {

                  const res = await API.get("/transactions/analytics");

                  return res.data;

            }
      });

      if (isLoading) {
            return <h2>Loading analytics...</h2>;
      }

      const stats = data.data;

      return (
            <div className="container">

                  <h2>Transaction Analytics</h2>

                  <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

                        <div className="card">
                              <h3>Total Transactions</h3>
                              <p>{stats.totalTransactions}</p>
                        </div>

                        <div className="card">
                              <h3>Successful Transactions</h3>
                              <p>{stats.successfulTransactions}</p>
                        </div>

                        <div className="card">
                              <h3>Failed Transactions</h3>
                              <p>{stats.failedTransactions}</p>
                        </div>

                        <div className="card">
                              <h3>Refunded Transactions</h3>
                              <p>{stats.refundedTransactions}</p>
                        </div>

                        <div className="card">
                              <h3>Total Refund Amount</h3>
                              <p>{stats.totalRefundAmount}</p>
                        </div>

                  </div>

            </div>
      );
}

export default Analytics;