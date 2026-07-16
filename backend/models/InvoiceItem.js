import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const InvoiceItem = sequelize.define(
  "InvoiceItem",
  {
    InvoiceId: {
      type: DataTypes.INTEGER,
    },

    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    hsnCode: {
      type: DataTypes.STRING,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    gst: {
      type: DataTypes.FLOAT,
      defaultValue: 18,
    },

    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "invoice_items",
    freezeTableName: true,
    timestamps: true,
  }
);

export default InvoiceItem;