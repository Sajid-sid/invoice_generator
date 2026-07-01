import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/customers">Customers</Link>
   
      <Link to="/create-invoice">Invoices</Link>
      <Link to="/">Logout</Link>
    </div>
  );
}

export default Sidebar;