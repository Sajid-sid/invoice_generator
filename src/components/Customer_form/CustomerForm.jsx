import { useState, useEffect } from "react";
import "./Customer_form.css"
function Customers() {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    gstin: "",
    phone: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedCustomers =
      JSON.parse(localStorage.getItem("customers")) || [];
    setCustomers(savedCustomers);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedCustomers;

    if (isEditing) {
      updatedCustomers = [...customers];
      updatedCustomers[editIndex] = formData;

      setIsEditing(false);
      setEditIndex(null);
    } else {
      updatedCustomers = [...customers, formData];
    }

    setCustomers(updatedCustomers);

    localStorage.setItem(
      "customers",
      JSON.stringify(updatedCustomers)
    );

    setFormData({
      customerName: "",
      gstin: "",
      phone: "",
      email: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(customers[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedCustomers = customers.filter(
      (_, i) => i !== index
    );

    setCustomers(updatedCustomers);

    localStorage.setItem(
      "customers",
      JSON.stringify(updatedCustomers)
    );

    if (isEditing && editIndex === index) {
      setIsEditing(false);
      setEditIndex(null);
      setFormData({
        customerName: "",
        gstin: "",
        phone: "",
        email: "",
      });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customer Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="gstin"
          placeholder="GSTIN"
          value={formData.gstin}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <button type="submit">
          {isEditing ? "Update Customer" : "Add Customer"}
        </button>
      </form>

      <hr />

      <h3>Customer List</h3>

      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>GSTIN</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.customerName}</td>
                <td>{customer.gstin}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>

                <td>
                  <button
                    onClick={() => handleEdit(index)}
                    type="button"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(index)}
                    type="button"
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Customers;