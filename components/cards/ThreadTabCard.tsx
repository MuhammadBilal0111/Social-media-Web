import { fetchUserThreads } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";
import ThreadCard from "./ThreadCard";

interface Props {
  currentUserId: string; // user db id
  accountId: string; // user clerk id
  accountType: string;
}

async function ThreadTabCard({ currentUserId, accountId, accountType }: Props) {
  const result = await fetchUserThreads(accountId); // accountId = clerk id
  // it give the threads(comments and main thread) that the user made with comments and the user that made the comment
  if (!result) redirect("/");
  // console.log(result);
  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId} // currentUserId can potentially be null
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: result.thread.name,
                  image: result.image,
                  id: result.id,
                }
          }
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
          isComments={true}
        />
      ))}
    </section>
  );
}

export default ThreadTabCard;
