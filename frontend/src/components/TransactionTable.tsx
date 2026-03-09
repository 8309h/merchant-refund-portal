import { Link } from "react-router-dom";

export default function TransactionTable({ transactions }: any) {

      return (
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
                        {transactions.map((tx: any) => (
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
      );
}