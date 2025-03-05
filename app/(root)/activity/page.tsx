import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUser, getActivities } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

async function page() {
  // getting the Activities
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo.onboarded) redirect("/onBoarding");

  // getting activities
  const activities = await getActivities(userInfo._id);
  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      <section>
        {activities.length > 0 ? (
          <>
            {activities.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    alt="Profile Picture"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="text-primary-500 mr-1">
                      {activity.author.name}
                    </span>{" "}
                    replied to your threads
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="text-light-3 !text-base-regular">No activity yet</p>
        )}
      </section>
    </section>
  );
}

export default page;
