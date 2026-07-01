import { useState,useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import CustomerForm from "../../components/Customer_form/CustomerForm";
import "./Customers.css";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    customerName: "",
    gstin: "",
    phone: "",
    email: ""
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

const fetchCustomers = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/customers");
    const data = await response.json();

    console.log("Customers:", data);

    setCustomers(data);
  } catch (err) {
    console.log(err);
  }
};



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const url = editingId
      ? `http://localhost:5000/api/customers/${editingId}`
      : "http://localhost:5000/api/customers";

    const method = editingId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName: formData.customerName,
        gstin: formData.gstin,
        phone: formData.phone,
        email: formData.email,
      }),
    });

    const data = await response.json();

    console.log(data);

    // Reload customers from database
    fetchCustomers();

    setEditingId(null);

    setFormData({
      customerName: "",
      gstin: "",
      phone: "",
      email: "",
    });

  } catch (err) {
    console.error(err);
  }
};
const handleEdit = (customer) => {
  setFormData({
    customerName: customer.name,
    gstin: customer.gstNumber,
    phone: customer.phone,
    email: customer.email,
  });

  setEditingId(customer.id);
};

const handleDelete = async (id) => {
  try {
    await fetch(`http://localhost:5000/api/customers/${id}`, {
      method: "DELETE",
    });

    fetchCustomers();
  } catch (err) {
    console.log(err);
  }
};

  return (
    <>
      <Navbar />

      <div className="customers-layout">
        <Sidebar />

        <div className="customers-content">
          <h2>Customer Management</h2>

          <CustomerForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isEditing={editingId}
          />

          <table>
        
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
<td>{customer.gstNumber}</td>
<td>{customer.phone}</td>
<td>{customer.email}</td>

                  <td>
                    <button
                      onClick={() => handleEdit(customer)}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(customer.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Customers;