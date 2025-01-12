"use client";
import React from "react";
import { sidebarLinks } from "@/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

function BottomBar() {
  const pathname = usePathname();
  return (
    <section className="fixed bottom-0 w-full z-10 rounded-t-3xl xs:px-7 p-4 md:hidden">
      <div className="flex items-center justify-between gap-2 xs:gap-5">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link?.route) && link.route.length > 1) ||
            pathname === link?.route;
          return (
            <Link
              href={link?.route}
              key={link?.label}
              className={`flex flex-col items-center gap-2 p-2 rounded-lg sm:flex-1 sm:px-2 sm:py-2.5 ${
                isActive && "bg-purple-600 "
              }`}
            >
              <Image
                src={link?.imgURL}
                alt={link?.label}
                width={24}
                height={24}
              />
              <p className="max-sm:hidden text-gray-300 font-semibold text-xs">
                {link?.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default BottomBar;
