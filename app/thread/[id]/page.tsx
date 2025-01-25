import ThreadCard from "@/components/cards/ThreadCard";
import Comments from "@/components/forms/Comments";
import { fetchThreadById } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  console.log(userInfo);
  if (!userInfo?.onboarded) redirect("/onBoarding");
  const thread = await fetchThreadById(params.id);
  console.log(thread);
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
          threadId={thread._id}
          currentUserImage={userInfo.image}
          currentUserId={userInfo._id}
        />
      </div>
      <div className="mt-7">
        {thread.children.map((thread: any) => (
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
            isComments={true}
          />
        ))}
      </div>
    </section>
  );
}

export default page;
