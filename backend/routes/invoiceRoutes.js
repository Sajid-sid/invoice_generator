// routes/invoiceRoutes.js

import express from "express";
import Invoice from "../models/Invoice.js";
import InvoiceItem from "../models/InvoiceItem.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { calculateGST } from "../utils/gstCalculator.js";

const router = express.Router();

/* ======================
   CREATE INVOICE
====================== */

router.post(
  "/create",
  authMiddleware,
  async (req, res) => {
    try {
      const {
        invoiceNumber,
        CompanyId,
        CustomerId,
        items,
      } = req.body;

      const {
        subTotal,
        gstTotal,
        grandTotal,
      } = calculateGST(items);

      const invoice =
        await Invoice.create({
          invoiceNumber,
          CompanyId,
          CustomerId,
          subTotal,
          gstTotal,
          grandTotal,
        });

      const invoiceItems =
        items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          gstRate: item.gstRate,
          InvoiceId: invoice.id,
        }));

      await InvoiceItem.bulkCreate(
        invoiceItems
      );

      res.status(201).json({
        message:
          "Invoice Created Successfully",
        invoice,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

/* ======================
   GET ALL INVOICES
====================== */

router.get(
  "/all",
  authMiddleware,
  async (req, res) => {
    try {
      const invoices =
        await Invoice.findAll({
          include: [
            {
              model: InvoiceItem,
              as: "items",
            },
          ],
        });

      res.status(200).json(invoices);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

export default router; 