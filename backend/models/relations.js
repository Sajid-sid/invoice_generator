// models/relations.js
import User from "./User.js";
import Company from "./Company.js";
import Customer from "./Customer.js";
import Invoice from "./Invoice.js";
import InvoiceItem from "./InvoiceItem.js";

// Company -> Invoice
Company.hasMany(Invoice, {
  foreignKey: "CompanyId",
});

Invoice.belongsTo(Company, {
  foreignKey: "CompanyId",
});

Customer.hasMany(Invoice, {
  foreignKey: "CustomerId",
});

Invoice.belongsTo(Customer, {
  foreignKey: "CustomerId",
});

Invoice.hasMany(InvoiceItem, {
  foreignKey: "InvoiceId",
  as: "items",
});

InvoiceItem.belongsTo(Invoice, {
  foreignKey: "InvoiceId",
});