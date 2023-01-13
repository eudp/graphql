import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  body: String,
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

export const Comment = mongoose.model("Comment", commentSchema);
