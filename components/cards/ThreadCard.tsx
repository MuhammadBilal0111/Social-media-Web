import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Author {
  _id?: string;
  id: string;
  bio?: string;
  image: string;
  name: string;
}
interface Props {
  id: string; // thread id
  currentUserId: string; // current user id
  parentId: string | null;
  content: string;
  author: Author;
  community: { id: string };
  createdAt: string;
  comments: [];
  isComments?: boolean;
}
function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComments,
}: Props) {
  console.log(id);
  // article is used for cards
  return (
    <article
      className={`flex w-full flex-col rounded-xl m-2 ${
        isComments ? " px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${author?.id}`}
              className="relative h-11 w-11"
            >
              <Image
                src={author?.image}
                alt="Profile image"
                fill
                className="object-cover cursor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex flex-col w-full">
            <Link href={`/profile/${author?.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1 hover:underline">
                {author?.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>
            <div
              className={`${isComments && "mtb-10"}mt-5 flex flex-col gap-3`}
            >
              <div className="flex gap-3.5">
                <Image
                  src="/assets/heart.svg"
                  alt="reply"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>

                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>
              {isComments && comments.length > 0 && (
                <Link href={`/thread/${id}`} className="w-fit">
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ThreadCard;
