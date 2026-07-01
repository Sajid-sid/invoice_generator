import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import sequelize from "./config/db.js";

import "./models/User.js";
import "./models/relations.js";

import authRoutes from "./routes/authRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import dashboardRoutes from "./routes/dashboardRoute.js"
import customerRoutes from "./routes/CustomerRoute.js"
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/customers", customerRoutes);
sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL Connected Successfully");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server Running On Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database Connection Error:", error);
  });
  