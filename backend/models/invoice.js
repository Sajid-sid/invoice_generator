import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Invoice = sequelize.define(
"Invoice",
{

invoiceNumber:DataTypes.STRING,

CustomerId:DataTypes.INTEGER,

invoiceDate:DataTypes.DATEONLY,


subTotal:DataTypes.FLOAT,

cgst:DataTypes.FLOAT,

sgst:DataTypes.FLOAT,

igst:DataTypes.FLOAT,

gstTotal:DataTypes.FLOAT,

grandTotal:DataTypes.FLOAT,


},
{
tableName:"invoice_invoices",
timestamps:true
}
);

export default Invoice;