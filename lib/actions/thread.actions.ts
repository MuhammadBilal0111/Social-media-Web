"use server"; // cors doesnot allow the frontend to use the server function if you donot define the use server
import Thread from "../models/thread.model";
import { connectDb } from "../mongoose";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import { throwDeprecation } from "process";
import mongoose, { model } from "mongoose";

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
      author, // id of user (_id)
      community: null,
    });
    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });
    revalidatePath(path); // use in server actions refresh the data of a particular path. It is useful when you want to update the UI with the latest data without requiring a full page reload.
  } catch (error: any) {
    throw new Error(`Error in creating the thread: ${error}`);
  }
}
export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  try {
    await connectDb();
    // fetch threads that have no parent i.e top level threads.
    // the thread that have have parents are comments but we don;t want to get it.
    const skipAmount = (pageNumber - 1) * pageSize;

    const threads = await Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      .limit(pageSize)
      .skip(skipAmount)

      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name username image",
        },
      });
    const totalPostCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });
    // threads.length is at most pageSize thread length
    // totalPostCount total length of threads present
    const isNext = totalPostCount > skipAmount + threads.length;
    return { threads, isNext };
  } catch (error: any) {
    throw new Error(`Error in creating the thread: ${error}`);
  }
}
export async function fetchThreadById(id: string) {
  try {
    connectDb();
    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: [
              {
                path: "author",
                model: User,
                select: "_id id name parentId image",
              },
            ],
          },
        ],
      });
    return thread;
  } catch (error: any) {
    throw new Error("Error fetching the threads info", error.message);
  }
}
export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  try {
    await connectDb();
    // find the original thread by id
    const originalThread = await Thread.findById(JSON.parse(threadId));

    if (!originalThread) {
      throw new Error("Thread not found");
    }
    console.log("originalThread", originalThread);
    const newThread = await Thread.create({
      text: commentText,
      author: userId,
      parentId: threadId,
    });
    originalThread.children.push(newThread._id);
    // save original Thread
    await originalThread.save();
    revalidatePath(path);
  } catch (error: any) {
    console.log(error);
    throw new Error("Error fetching the threads info", error.message);
  }
}
