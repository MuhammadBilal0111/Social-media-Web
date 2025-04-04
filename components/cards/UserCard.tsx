"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  name: string;
  username: String;
  imgUrl: string;
  personType: string;
}
function UserCard({ id, name, username, imgUrl, personType }: Props) {
  const router = useRouter();
  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <Image
          src={imgUrl}
          alt="Logo"
          width={48}
          height={48}
          className="rounded-full"
        />
        {/* text-ellipsis->if text is long then show... */}
        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
        <Button
          className="user-card_btn"
          onClick={() => router.push(`/profile/${id}`)}
        >
          View
        </Button>
      </div>
    </article>
  );
}

export default UserCard;
