import Image from "next/image";
import React from "react";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
}
function ProfileHeader({
  accountId, // db _id of user
  authUserId, // clerk id of user
  name,
  username,
  imgUrl,
  bio,
}: Props) {
  return (
    <div className="flex flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="Profile Image"
              fill // Image expands to cover its parent
              className="rounded-full object-cover shadow-2xl"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-left text-heading3-bold">{name}</h2>
            <p className="text-gray-1 text-base-medium">@{username}</p>
          </div>
        </div>
      </div>
      <p className="text-base-regular text-light-1 mt-6 max-w-lg">{bio}</p>
      <div className="mt-6 h-0.5 w-full bg-dark-2" />
    </div>
  );
}

export default ProfileHeader;
