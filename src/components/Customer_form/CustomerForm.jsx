import { useState, useEffect } from "react";
import "./Customer_form.css";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    customerName: "",
    gstin: "",
    phone: "",
    email: "",
  });

  const [editingId, setEditingId] = useState(null);


  // Fetch customers from database
  useEffect(() => {
    fetchCustomers();
  }, []);


  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/customers"
      );

      const data = await response.json();

      console.log("Customers:", data);

      setCustomers(data);

    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };


  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // Add / Update customer
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

      console.log("Response:", data);


      fetchCustomers();


      setEditingId(null);

      setFormData({
        customerName: "",
        gstin: "",
        phone: "",
        email: "",
      });


    } catch (error) {
      console.error("Submit Error:", error);
    }
  };


  // Edit customer
  const handleEdit = (customer) => {

    setFormData({
      customerName: customer.name,
      gstin: customer.gstNumber,
      phone: customer.phone,
      email: customer.email,
    });


    setEditingId(customer.id);
  };


  // Delete customer
  const handleDelete = async (id) => {

    try {

      await fetch(
        `http://localhost:5000/api/customers/${id}`,
        {
          method: "DELETE",
        }
      );


      fetchCustomers();


    } catch (error) {

      console.error("Delete Error:", error);

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
          {editingId ? "Update Customer" : "Add Customer"}
        </button>


      </form>


      <hr />


      <h3>Customer List</h3>


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

          {customers.map((customer)=>(

            <tr key={customer.id}>

              <td>{customer.name}</td>

              <td>{customer.gstNumber}</td>

              <td>{customer.phone}</td>

              <td>{customer.email}</td>


              <td>

                <button
                  type="button"
                  onClick={() => handleEdit(customer)}
                >
                  Edit
                </button>


                <button
                  type="button"
                  onClick={() => handleDelete(customer.id)}
                  style={{marginLeft:"10px"}}
                >
                  Delete
                </button>


              </td>

            </tr>

          ))}

        </tbody>

      </table>


    </div>
  );
}

export default Customers;