const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  techStack: [String],
  links: {
    github: String,
    live: String,
  },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Project", ProjectSchema);