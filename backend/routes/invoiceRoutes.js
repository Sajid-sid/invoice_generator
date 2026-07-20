// routes/invoiceRoutes.js

import express from "express";
import Invoice from "../models/Invoice.js";
import InvoiceItem from "../models/InvoiceItem.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { calculateGST } from "../utils/gstCalculator.js";
import { checkInvoiceLimit } from  "../controller/invoiceController.js";

const router = express.Router();

/* ======================
   CREATE INVOICE
====================== */
router.post(
  "/create",
  authMiddleware,
  async (req, res) => {

    const transaction = await Invoice.sequelize.transaction();

    try {
const {

invoiceNumber,

CustomerId,

companyName,

companyGST,

companyAddress,


subTotal,

cgst,

sgst,

igst,

gstTotal,

grandTotal,


items

} = req.body;


      // ============================
      // CHECK INVOICE LIMIT
      // ============================

      const invoiceCount = await Invoice.count({
        where:{
          CustomerId: CustomerId
        }
      });


      if(invoiceCount >= 3){

        await transaction.rollback();

        return res.status(403).json({
          allowed:false,
          message:"You have reached the invoice limit. Please subscribe to continue."
        });

      }



      // Validate items
      if (!items || items.length === 0) {

        await transaction.rollback();

        return res.status(400).json({
          message:"Invoice items are required"
        });

      }



      // Calculate GST
      // const {
      //   subTotal,
      //   cgst,
      //   sgst,
      //   igst,
      //   gstTotal,
      //   grandTotal,

      // } = calculateGST(items);



      // Create Invoice
      const invoice = await Invoice.create(
        {
          invoiceNumber,

 CustomerId,

 invoiceDate:new Date(),


 // Company Details
 companyName,
 companyGST,
 companyAddress,


 // GST Amounts
 subTotal,
 cgst,
 sgst,
 igst,
 gstTotal,
 grandTotal,


        },
        {
          transaction
        }
      );



      // Create Invoice Items

      const invoiceItems = items.map((item)=>({

        productName:item.name,

        hsnCode:item.hsnCode,

        quantity:item.quantity,

        price:item.price,

        gst:item.gstRate,

        total:item.quantity * item.price,

        InvoiceId:invoice.id

      }));



      await InvoiceItem.bulkCreate(
        invoiceItems,
        {
          transaction
        }
      );



      await transaction.commit();


      res.status(201).json({

        message:"Invoice Created Successfully",

        invoice

      });



    } catch(error){


      await transaction.rollback();


      console.log(error);


      res.status(500).json({

        message:"Server Error",

        error:error.message

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
router.get(
  "/invoice-limit/:customerId",
  checkInvoiceLimit
);


export default router; 

