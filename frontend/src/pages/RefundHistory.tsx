import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../api/axios";

function RefundHistory() {

      const [page, setPage] = useState(1);

      const { data, isLoading } = useQuery({
            queryKey: ["refunds", page],
            queryFn: async () => {

                  const res = await API.get("/refunds", {
                        params: { page }
                  });

                  return res.data;
            }
      });

      if (isLoading) {
            return <h2 style={{ padding: "20px" }}>Loading refunds...</h2>;
      }

      return (
            <div className="container">

                  <h2>Refund History</h2>

                  <table border={1} cellPadding={10} width="100%">

                        <thead>
                              <tr>
                                    <th>Transaction ID</th>
                                    <th>Refund Amount</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th>Date</th>
                              </tr>
                        </thead>

                        <tbody>

                              {data.data.length === 0 && (
                                    <tr>
                                          <td colSpan={5} style={{ textAlign: "center" }}>
                                                No refunds found
                                          </td>
                                    </tr>
                              )}

                              {data.data.map((refund: any) => (
                                    <tr key={refund._id}>

                                          <td>{refund.transactionId}</td>

                                          <td>{refund.refundAmount}</td>

                                          <td>{refund.reason}</td>

                                          <td>{refund.status}</td>

                                          <td>
                                                {new Date(refund.createdAt).toLocaleDateString()}
                                          </td>

                                    </tr>
                              ))}

                        </tbody>

                  </table>

                  {/* Pagination */}

                  <div className="pagination">

                        <button
                              disabled={page === 1}
                              onClick={() => setPage(page - 1)}
                        >
                              Previous
                        </button>

                        <span>
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

export default RefundHistory;