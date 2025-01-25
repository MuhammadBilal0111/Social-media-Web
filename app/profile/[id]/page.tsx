import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";
import { profileTabs } from "@/constant";
import Image from "next/image";
import ThreadTabCard from "@/components/cards/ThreadTabCard";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(params.id);
  if (!userInfo.onboarded) redirect("/onBoarding");
  return (
    <section>
      <ProfileHeader
        accountId={userInfo?._id}
        authUserId={user?.id}
        name={userInfo?.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
      <div className="mt-9">
        <Tabs defaultValue="thread" className="w-full">
          <TabsList>
            {profileTabs.map((profileTab) => (
              <TabsTrigger key={profileTab.label} value={profileTab.value}>
                <Image
                  src={profileTab.icon}
                  height={24}
                  width={24}
                  alt={profileTab.label}
                  className="object contain"
                />
                <p className="max-sm:hidden">{profileTab.label}</p>
                {profileTab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 text-tiny-medium text-light-1">
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((profileTab) => (
            <TabsContent
              key={`content-${profileTab.label}`}
              value={profileTab.value}
              className="text-light-1 w-full"
            >
              {profileTab.label}
              <ThreadTabCard
                currentUserId={userInfo._id}
                accountId={user.id}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
