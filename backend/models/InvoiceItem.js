// models/Invoice.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Invoice = sequelize.define(
  "Invoice",
  {
    invoiceNumber: DataTypes.STRING,
    subTotal: DataTypes.FLOAT,
    gstTotal: DataTypes.FLOAT,
    grandTotal: DataTypes.FLOAT,
  },
  {
    tableName: "invoices",   // <-- Your MySQL table name
    timestamps: true,        // createdAt & updatedAt exist
    freezeTableName: true,
  }
);

export default Invoice;