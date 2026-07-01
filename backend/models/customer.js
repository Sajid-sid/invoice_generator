// models/Customer.js

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Customer = sequelize.define(
  "Customer",
  {
    name: DataTypes.STRING,
    gstNumber: DataTypes.STRING,
    address: DataTypes.TEXT,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  {
    tableName: "invoice_customers",
    timestamps: false,
  }
);

export default Customer;