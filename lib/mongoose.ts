import mongoose from "mongoose";
// best practices to connect mongodb
let isConnected = false;
export const connectDb = async () => {
  mongoose.set("strictQuery", true); // ensures that only the fields defined in your Mongoose schema are allowed in queries.
  if (!process.env.MONGODB_URL) return console.log("MONGO_URL not found");
  if (isConnected) return console.log("Already connected to MongoDb");
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("Connected to MongoDb");
  } catch (error) {
    console.log(error);
  }
};
