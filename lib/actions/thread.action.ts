"use server"; // cors doesnot allow the frontend to use the server function if you donot define the use server
import Thread from "../models/threadModel";
import { connectDb } from "../mongoose";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}
// server action for creating thread
export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    await connectDb();
    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });
    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error in creating the thread: ${error}`);
  }
}
