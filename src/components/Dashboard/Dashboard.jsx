import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    customers: 0,
    products: 0,
    invoices: 0,
  });

useEffect(() => {
  fetchDashboardStats();
}, []);

  const fetchDashboardStats = async () => {
  try {
    console.log("Calling Dashboard API...");

    const response = await fetch(
      "http://localhost:5000/api/dashboard/stats"
    );

    console.log("Status:", response.status);

    const data = await response.json();

    console.log("Dashboard Data:", data);

    setStats({
      customers: data.customers || 0,
      products: data.products || 0,
      invoices: data.invoices || 0,
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
  }
};
  useEffect(() => {
    console.log("Updated Stats:", stats);
  }, [stats]);

  return (
    <>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <div className="dashboard-content">
          <h1>Dashboard</h1>

          <div className="cards">
            <div className="card">
              <h3>Total Customers</h3>
              <p>{stats.customers}</p>
            </div>

            <div className="card">
              <h3>Total Products</h3>
              <p>{stats.products}</p>
            </div>

            <div className="card">
              <h3>Total Invoices</h3>
              <p>{stats.invoices}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}  

export default Dashboard;