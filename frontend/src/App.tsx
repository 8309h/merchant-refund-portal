import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import TransactionDetail from "./pages/TransactionDetail";
import RefundHistory from "./pages/RefundHistory";
import Analytics from "./pages/Analytics";


function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/transactions/:id" element={<TransactionDetail />} />

          <Route path="/refunds" element={<RefundHistory />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;