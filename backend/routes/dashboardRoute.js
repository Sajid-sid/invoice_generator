import express from "express";
import Invoice from "../models/Invoice.js";
import Customer from "../models/Customer.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const invoices = await Invoice.findAll({ raw: true });
    const customers = await Customer.findAll({ raw: true });

    console.log("Invoices:", invoices.length);
    console.log("Customers:", customers.length);

    const totalInvoices = await Invoice.count();
    const totalCustomers = await Customer.count();

    res.json({
      customers: totalCustomers,
      products: 0,
      invoices: totalInvoices,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;