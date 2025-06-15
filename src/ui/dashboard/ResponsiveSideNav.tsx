// components/ResponsiveSideNav.tsx
"use client";

import Link from "next/link";
import NavLinks from "@/ui/dashboard/nav-links";
import LogoutForm from "@/ui/dashboard/logout-form";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
//import { MenuIcon, XIcon } from "@heroicons/react/outline";

export default function ResponsiveSideNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:flex h-full flex-col px-3 py-4 hidden md:px-2">
      {/* Desktop */}
      <div className="flex flex-col space-y-2">
        <NavLinks />
        <hr className="my-2 border-t border-gray-300 dark:border-gray-600" />
        <Link
          href="/dashboard/profile"
          className={clsx(
            "flex items-center gap-2 rounded-md p-2 px-3 text-sm font-medium transition-colors",
            "bg-gray-50 text-gray-800 hover:bg-sky-100 hover:text-blue-600",
            "dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white",
            {
              "bg-sky-100 text-blue-600 dark:bg-blue-900 dark:text-white":
                pathname === "/dashboard/profile",
            }
          )}
        >
          <UserCircleIcon className="w-5 h-5" />
          <span className="hidden md:block">Profile</span>
        </Link>
        <LogoutForm />
      </div>
    </div>
  );
}
