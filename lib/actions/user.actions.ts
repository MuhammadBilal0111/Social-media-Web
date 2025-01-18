"use server"; // This tells Next.js to run this function on the server
// What Are Server Actions?
// Server Actions are functions that run directly on the server instead of the client. They allow you to perform server-side logic, such as database operations or API calls, without exposing your logic to the client.
import { connectDb } from "../mongoose";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface Params {
  userId: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  path: string;
}
export async function updateUser({
  userId,
  username,
  name,
  image,
  bio,
  path,
}: Params): Promise<void> {
  //  Promise that resolves to void.
  try {
    await connectDb();
    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, image, bio, onboarded: true },
      { upsert: true, new: true }
    );
    console.log(updatedUser);
    if (path === "/profile/edit") {
      revalidatePath(path); // refresh the page
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user:${error.message}`);
  }
}
export async function fetchUser(userId: string) {
  try {
    await connectDb();
    return await User.findOne({ id: userId });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}
