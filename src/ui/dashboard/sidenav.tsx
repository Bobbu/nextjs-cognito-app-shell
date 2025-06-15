"use client";
import Link from "next/link";
import NavLinks from "@/ui/dashboard/nav-links";
import LogoutForm from "@/ui/dashboard/logout-form";
import clsx from "clsx";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();
return (
  <div className="flex h-full flex-col px-3 py-4 md:px-2">
    <div className="flex flex-col space-y-2">
      <NavLinks />
    </div>

    <hr className="my-3 border-t border-gray-300 dark:border-gray-600" />

    <div className="flex flex-col space-y-2">
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
