// execute on server side
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs/server";

async function page() {
  const user = await currentUser();
  const result = await fetchThreads();
  console.log(result);
  return (
    <>
      <h1 className="head-text">Home</h1>
      <section className="mt-9">
        {result.threads.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.threads.map((thread) => (
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
                // isComments={true}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}

export default page;
