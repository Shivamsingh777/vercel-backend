const express = require("express");
const Comment = require("../models/Comment");
const authMiddleware = require("../utils/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const comment = new Comment({ ...req.body, userId: req.user.id });
  await comment.save();
  res.json(comment);
});

router.get("/:projectId", async (req, res) => {
  const comments = await Comment.find({ projectId: req.params.projectId }).populate("userId");
  res.json(comments);
});

module.exports = router;