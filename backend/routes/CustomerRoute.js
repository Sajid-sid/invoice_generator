import express from "express";
import Customer from "../models/Customer.js";

const router = express.Router();

// Get all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.findAll({
      order: [["id", "DESC"]],
    });

    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add customer
router.post("/", async (req, res) => {
  try {
    const customer = await Customer.create({
      name: req.body.customerName,
      gstNumber: req.body.gstin,
      phone: req.body.phone,
      email: req.body.email,
    });

    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update customer
router.put("/:id", async (req, res) => {
  try {
    await Customer.update(
      {
        name: req.body.customerName,
        gstNumber: req.body.gstin,
        phone: req.body.phone,
        email: req.body.email,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const updatedCustomer = await Customer.findByPk(req.params.id);

    res.json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete customer
router.delete("/:id", async (req, res) => {
  try {
    await Customer.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Customer deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;