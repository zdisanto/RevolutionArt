import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  access: {
    type: String,
    enum: ["VIP", "Ultra Elite", "Elite"],
    required: true,
  },
});

export default mongoose.model("Article", articleSchema);