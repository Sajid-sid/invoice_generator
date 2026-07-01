import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

/* SIGNUP */
router.post("/signup", async (req, res) => {
  try {
    console.log("🔥 SIGNUP API HIT");

    // 🔥 log headers also (helps debug frontend issues)
    console.log("HEADERS:", req.headers["content-type"]);

    // 🔥 ensure JSON body is parsed
    const body = req.body;
    console.log("BODY RECEIVED:", body);

    const { name, email, password } = body || {};

    // ✅ strict validation
    if (!name || !email || !password) {
      console.log("❌ Missing fields:", { name, email, password });
      return res.status(400).json({
        message: "Missing required fields (name, email, password)"
      });
    }

    // 🔍 check duplicate user
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      console.log("⚠️ User already exists:", email);
      return res.status(409).json({
        message: "User already exists"
      });
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("🔐 Password hashed");

    // 💾 create user
    const user = await User.create({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
      role: "admin"
    });

    console.log("✅ USER SAVED IN DB:", user.toJSON());

    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.log("❌ SIGNUP ERROR FULL:", error);

    return res.status(500).json({
      message: "Server error during signup",
      error: error.message
    });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    console.log("🔥 LOGIN API HIT");
    console.log("BODY:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      console.log("❌ Missing login fields");
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ message: "Invalid Email" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      console.log("❌ Wrong password");
      return res.status(400).json({ message: "Invalid Password" });
    }

    console.log("✅ LOGIN SUCCESS:", user.email);

    res.json({
      message: "Login Successful",
      user
    });

  } catch (error) {
    console.log("❌ LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;