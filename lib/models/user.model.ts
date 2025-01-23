import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Id is a required field"],
  },
  username: {
    type: String,
    required: [true, "Id is a required field"],
    unique: true,
  },
  image: String,
  bio: String,
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread", // used to link the user collection with thread
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community", // used to link the user collection with communities
    },
  ],
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
