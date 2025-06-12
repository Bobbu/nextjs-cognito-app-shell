"use client";
import Link from "next/link";
import NavLinks from "@/ui/dashboard/nav-links";
import AcmeLogo from "@/ui/acme-logo";
import LogoutForm from "@/ui/dashboard/logout-form";
import clsx from "clsx";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 dark:bg-gray-800 md:block" />
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
          <span className="hidden md:block">Profile</span>{" "}
        </Link>
        <LogoutForm />
      </div>
    </div>
  );
}
