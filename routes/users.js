const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../utils/authMiddleware");
const router = express.Router();

// ✅ Get current logged-in user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -__v");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

// ✅ Update profile of logged-in user
router.put("/me", authMiddleware, async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// ✅ Search users by name or username
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q;
    const users = await User.find({
      $or: [
        { username: { $regex: q, $options: "i" } },
        { name: { $regex: q, $options: "i" } }
      ]
    }).select("-password -__v");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;