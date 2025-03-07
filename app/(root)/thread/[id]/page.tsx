import ThreadCard from "@/components/cards/ThreadCard";
import Comments from "@/components/forms/Comments";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onBoarding");

  const thread = await fetchThreadById(params?.id);

  return (
    <section>
      <ThreadCard
        key={thread._id}
        id={thread._id}
        currentUserId={user?.id || ""} // currentUserId can potentially be null
        parentId={thread.parentId}
        content={thread.text}
        author={thread.author}
        community={thread.community}
        createdAt={thread.createdAt}
        comments={thread.children}
      />
      <div className="mt-7">
        <Comments
          threadId={JSON.stringify(thread._id)} // mongoose object _id not pass through props
          currentUserImage={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)} // because _id is mongoose special object
        />
      </div>
      <div className="mt-7">
        {thread.children.map((childThread: any) => (
          <ThreadCard
            key={childThread._id}
            id={childThread._id}
            currentUserId={user?.id || ""} // currentUserId can potentially be null
            parentId={childThread.parentId}
            content={childThread.text}
            author={childThread.author}
            community={childThread.community}
            createdAt={childThread.createdAt}
            comments={childThread.children}
            isComments={true}
          />
        ))}
      </div>
    </section>
  );
}

export default page;
