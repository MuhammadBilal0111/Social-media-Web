"use client";
import React from "react";
import { sidebarLinks } from "@/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

function BottomBar() {
  const pathname = usePathname();
  return (
    <section className="bottombar">
      <div className="bottombar-container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link?.route) && link.route.length > 1) ||
            pathname === link?.route;
          return (
            <Link
              href={link?.route}
              key={link?.label}
              className={`bottombar-link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link?.imgURL}
                alt={link?.label}
                width={24}
                height={24}
              />
              <p className="max-sm:hidden text-subtle-medium text-light-1 text">
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
