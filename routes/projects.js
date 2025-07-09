const express = require("express");
const Project = require("../models/Project");
const authMiddleware = require("../utils/authMiddleware");
const router = express.Router();

// POST /api/projects - Create a new project (requires login)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const project = new Project({ ...req.body, userId: req.user.id });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/projects - List all projects (with optional search by title)
router.get("/", async (req, res) => {
  try {
    const q = req.query.q;
    const filter = q ? { title: { $regex: q, $options: "i" } } : {};
    const projects = await Project.find(filter).populate("userId", "username name email");
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
