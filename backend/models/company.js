// models/Company.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Company = sequelize.define("Company", {
  name: DataTypes.STRING,
  gstNumber: DataTypes.STRING,
  address: DataTypes.TEXT,
  phone: DataTypes.STRING,
  email: DataTypes.STRING
});

export default Company;