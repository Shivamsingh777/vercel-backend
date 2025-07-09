const mongoose = require('mongoose'); // ✅ Add this line at the top

const CommentSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", CommentSchema);





// const CommentSchema = new mongoose.Schema({
//   projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   content: String,
//   createdAt: { type: Date, default: Date.now },
// });
// module.exports = mongoose.model("Comment", CommentSchema);