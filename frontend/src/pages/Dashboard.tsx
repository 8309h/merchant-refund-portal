import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../api/axios";
import { Link } from "react-router-dom";

function Dashboard() {

      const [page, setPage] = useState(1);
      const [status, setStatus] = useState("");
      const [search, setSearch] = useState("");
      const [fromDate, setFromDate] = useState("");
      const [toDate, setToDate] = useState("");

      const { data, isLoading } = useQuery({
            queryKey: ["transactions", page, status, search, fromDate, toDate],
            queryFn: async () => {

                  const res = await API.get("/transactions", {
                        params: {
                              page,
                              status,
                              search,
                              fromDate,
                              toDate
                        }
                  });

                  return res.data;
            }
      });

      if (isLoading) {
            return <h2 style={{ padding: "20px" }}>Loading transactions...</h2>;
      }

      return (
            <div className="container" style={{ padding: "20px" }}>

                  <h2>Transactions</h2>

                  {/* Filters */}
                  <div className="filters" style={{ marginBottom: "20px" }}>

                        <input
                              placeholder="Search Transaction ID"
                              value={search}
                              onChange={(e) => {
                                    setPage(1);
                                    setSearch(e.target.value);
                              }}
                              style={{ marginRight: "10px" }}
                        />

                        <select
                              value={status}
                              onChange={(e) => {
                                    setPage(1);
                                    setStatus(e.target.value);
                              }}
                              style={{ marginRight: "10px" }}
                        >
                              <option value="">All Status</option>
                              <option value="Successful">Successful</option>
                              <option value="Failed">Failed</option>
                              <option value="Pending">Pending</option>
                              <option value="Refunded">Refunded</option>
                        </select>

                        <input
                              type="date"
                              value={fromDate}
                              onChange={(e) => {
                                    setPage(1);
                                    setFromDate(e.target.value);
                              }}
                              style={{ marginRight: "10px" }}
                        />

                        <input
                              type="date"
                              value={toDate}
                              onChange={(e) => {
                                    setPage(1);
                                    setToDate(e.target.value);
                              }}
                        />

                  </div>

                  {/* Table */}
                  <table border={1} cellPadding={10} width="100%">

                        <thead>
                              <tr>
                                    <th>Transaction ID</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                              </tr>
                        </thead>

                        <tbody>

                              {data.data.length === 0 && (
                                    <tr>
                                          <td colSpan={4} style={{ textAlign: "center" }}>
                                                No transactions found
                                          </td>
                                    </tr>
                              )}

                              {data.data.map((tx: any) => (
                                    <tr key={tx._id}>

                                          <td>
                                                <Link to={`/transactions/${tx._id}`}>
                                                      {tx.transactionId}
                                                </Link>
                                          </td>

                                          <td>{tx.amount}</td>

                                          <td>{tx.status}</td>

                                          <td>
                                                {new Date(tx.createdAt).toLocaleDateString()}
                                          </td>

                                    </tr>
                              ))}

                        </tbody>

                  </table>

                  {/* Pagination */}
                  <div className="pagination" style={{ marginTop: "20px" }}>

                        <button
                              disabled={page === 1}
                              onClick={() => setPage(page - 1)}
                        >
                              Previous
                        </button>

                        <span style={{ margin: "0 10px" }}>
                              Page {data.pagination.page} of {data.pagination.totalPages}
                        </span>

                        <button
                              disabled={page === data.pagination.totalPages}
                              onClick={() => setPage(page + 1)}
                        >
                              Next
                        </button>

                  </div>

            </div>
      );
}

export default Dashboard;