import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import PostThread from "@/components/forms/PostThread";

async function page() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onBoarding");

  return (
    <>
      <h1 className="head-text">Create thread</h1>
      <PostThread userId={userInfo?._id} />
    </>
  );
}

export default page;
