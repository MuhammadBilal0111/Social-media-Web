import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Id is a required field"],
  },
  name: {
    type: String,
    required: [true, "Name is a required field"],
  },
  username: {
    type: String,
    required: [true, "Username is a required field"],
    unique: true,
  },
  image: String,
  bio: String,
  threads: [
    // array to store the ids of each threads
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread", // used to link the user collection with thread
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
const Community =
  mongoose.models.Community || mongoose.model("Community", communitySchema);
export default Community;
