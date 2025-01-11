import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignOutButton, OrganizationSwitcher } from "@clerk/nextjs";
function TopBar() {
  return (
    <nav className="fixed top-0 flex w-full items-center justify-between py-3 px-6 bg-gray-950 text-white">
      <Link href="/" className="flex items-center gap-4">
        <Image src={"/assets/logo.svg"} alt="Logo" width={28} height={28} />
        <p className="max-xs:hidden text-2xl font-bold text-gray-300">
          Threads
        </p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            {/* <SignOutButton> */}
            <div className="cursor-pointer flex">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              ></Image>
            </div>
            {/* </SignOutButton> */}
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
}

export default TopBar;
