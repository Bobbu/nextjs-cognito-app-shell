// ui/components/TopNav.tsx
"use client";

import Link from "next/link";
import {
  InformationCircleIcon,
  EnvelopeIcon,
  ArrowRightCircleIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import ResponsiveLogo from "@/ui/components/ResponsiveLogo";
import useAuthUser from "@/app/hooks/use-auth-user";
import UserMenu from "@/ui/components/UserMenu";

export default function TopNav() {
  const user = useAuthUser();

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow">
      <div className="text-xl font-semibold text-gray-800 dark:text-white">
        <ResponsiveLogo />
      </div>
      <div className="flex items-center space-x-6 text-sm md:text-base">
        <Link
          href="/about"
          className="text-gray-800 dark:text-white hover:underline"
        >
          <span className="flex items-center space-x-2">
            <InformationCircleIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <span>About</span>
          </span>
        </Link>
        <Link
          href="/contact-us"
          className="text-gray-800 dark:text-white hover:underline"
        >
          <span className="flex items-center space-x-2">
            <EnvelopeIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <span>Contact Us</span>
          </span>
        </Link>
        {user ? (
          <>
            <Link
              href="/dashboard"
              className="text-gray-800 dark:text-white hover:underline"
            >
          <span className="flex items-center space-x-2">
            <Squares2X2Icon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <span>Dashboard</span>
          </span>
            </Link>
            <UserMenu />
          </>
        ) : (
          <Link
            href="/auth/login"
            className="text-gray-800 dark:text-white hover:underline"
          >
          <span className="flex items-center space-x-2">
            <ArrowRightCircleIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            <span>Sign In</span>
          </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
