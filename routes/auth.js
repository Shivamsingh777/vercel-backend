const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, name } = req.body;

    if (!username || !email || !password || !name)
      return res.status(400).json({ error: "All fields are required." });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists." });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, username, email, password: hashed });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Exclude password before sending user data
    const { password: _, ...userData } = user.toObject();

    res.json({ token, user: userData });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const router = express.Router();

// router.post("/signup", async (req, res) => {
//   try {
//     const { username, email, password, name } = req.body;

//     if (!username || !email || !password || !name)
//   return res.status(400).json({ error: "All fields are required." });

//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ error: "Email already exists." });

//     const hashed = await bcrypt.hash(password, 10);
//     const user = new User({ username, email, name, password: hashed });
//     await user.save();

//     res.status(201).json({ message: "User created successfully" });
//   } catch (err) {
//     console.error("Signup Error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });


// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
  
//   if (!user || !(await bcrypt.compare(password, user.password)))
//     return res.status(401).send("Invalid credentials");
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//   res.json({ token });
// });

// module.exports = router;