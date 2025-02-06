"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { sidebarLinks } from "../../constant/index";
import { SignedIn, SignOutButton } from "@clerk/nextjs";

function LeftSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex flex-col gap-2 px-4 w-full flex-1">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link?.route) && link.route.length > 1) ||
            pathname === link?.route;
          return (
            <Link
              href={link?.route}
              key={link?.label}
              className={`leftsidebar-link ${
                isActive && "bg-primary-500 rounded-lg"
              }`}
            >
              <Image
                src={link?.imgURL}
                alt={link?.label}
                width={24}
                height={24}
              />
              <p className="max-lg:hidden text-light-1">{link?.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="px-6 mt-10">
        {/* if sign in then show the logout button */}
        <SignedIn>
          <SignOutButton>
            {/* for customize button use the div inside the SignOutButton */}
            <div className="cursor-pointer flex items-center gap-4 px-2">
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
