import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export const Post = mongoose.model("Post", postSchema);
