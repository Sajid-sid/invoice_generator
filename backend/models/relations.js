// models/relations.js

import User from "./User.js";
import Customer from "./Customer.js";
import Invoice from "./Invoice.js";
import InvoiceItem from "./InvoiceItem.js";


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