import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Invoice = sequelize.define(
  "Invoice",
  {
    invoiceNumber: DataTypes.STRING,
    CompanyId: DataTypes.INTEGER,
    CustomerId: DataTypes.INTEGER,
    invoiceDate: DataTypes.DATEONLY,

    subTotal: DataTypes.FLOAT,
    cgst: DataTypes.FLOAT,
    sgst: DataTypes.FLOAT,
    igst: DataTypes.FLOAT,
    gstTotal: DataTypes.FLOAT,
    grandTotal: DataTypes.FLOAT,

    paymentStatus: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
  },
  {
    tableName: "invoice_invoices",
    freezeTableName: true,
    timestamps: true,
  }
);

export default Invoice;