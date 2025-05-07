const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../database");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../middleware/auth");

// Public Routes - Home Page
router.get("/home", (req, res) => {
  console.log("Hit /home route!");
  res.json({ message: "Welcome to the home page" });
});

router.get("/login", (req, res) => {
  res.json({ message: "Welcome to the login page" });
});

router.get("/signup", (req, res) => {
  res.json({ message: "SignUp Works!" });
});

router.post("/signup", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
      const [result] = await db.execute(
        "INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)",
        [first_name, last_name, email, hashedPassword, false]
      );

      const token = jwt.sign({ id: result.insertId, role: false }, jwt_secret, {
        expiresIn: "24h",
      });
      res.json({
        message: "User created successfully",
        token,
        user: {
          id: result.insertId,
          email,
          first_name,
          last_name,
          role: false,
        },
      });
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "Email already exists" });
      }
      throw error;
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error/signup" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log('Inside login')
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];

    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ message: "Invalid email or password" });
    console.log("hey")
    

    const token = jwt.sign({ 
      id: user.user_id, role: user.role },
      jwt_secret, 
      {expiresIn: "24h",}
    );

    res.json({
      token,
      user: {
        id: user.user_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  console.log('Logout Works! ');
  res.status(200).json({ message: "Logged out successfully" });

});


module.exports = router;
