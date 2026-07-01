import { Routes, Route } from "react-router-dom";

import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import Dashboard from "../components/Dashboard/Dashboard";
import Customers from "../components/Customers/Customers";

import CreateInvoice from "../components/CreateInvoice/create_invoice"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/customers" element={<Customers />} />
    
      <Route path="/create-invoice" element={<CreateInvoice />} />
    
    </Routes>
  );
}

export default AppRoutes;