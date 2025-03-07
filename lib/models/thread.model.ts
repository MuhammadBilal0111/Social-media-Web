import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Text is a required field"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread", // it means that each thread can have multiple thread(comments)
    },
  ],
});
const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);
export default Thread;

// Original Thread
//   ->Thread Commment_1
//   ->Thread Commment_2
//      ->Thread Commment_3
