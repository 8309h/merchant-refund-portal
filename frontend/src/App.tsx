import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import TransactionDetail from "./pages/TransactionDetail";


function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/transactions/:id"
            element={<TransactionDetail />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;