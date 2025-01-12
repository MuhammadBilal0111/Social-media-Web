"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { sidebarLinks } from "../../constant/index";
import { SignedIn, SignOutButton } from "@clerk/nextjs";

function LeftSidebar() {
  const pathname = usePathname();
  console.log(pathname);
  const router = useRouter();
  return (
    <section className="sticky left-0 top-0 flex flex-col justify-between bg-gray-950 h-screen w-fit pb-5 pt-28 max-md:hidden">
      <div className="flex flex-col gap-2 px-4 w-full flex-1">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link?.route) && link.route.length > 1) ||
            pathname === link?.route;
          return (
            <Link
              href={link?.route}
              key={link?.label}
              className={`flex items-center gap-6 p-4 ${
                isActive && "bg-purple-600 rounded-lg "
              }`}
            >
              <Image
                src={link?.imgURL}
                alt={link?.label}
                width={24}
                height={24}
              />
              <p className="max-lg:hidden text-gray-300 font-semibold">
                {link?.label}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="px-4 mt-10">
        <SignedIn>
          <SignOutButton>
            <div className="cursor-pointer flex items-center gap-6 p-4">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p className="max-lg:hidden text-gray-300 font-semibold">
                Logout
              </p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default LeftSidebar;
