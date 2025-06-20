// ui/components/TopNav.tsx
"use client";

import Link from "next/link";
import ResizableLogo from "./ResizableLogo";
// import AcmeLogo from "@/ui/acme-logo";
import useAuthUser from "@/app/hooks/use-auth-user";

export default function TopNav() {
  const user = useAuthUser();

  return (
    <nav className="flex items-center justify-between px-4 py-2 md:py-4 bg-white dark:bg-gray-900 shadow min-h-[80px]">
     <div className="flex items-center space-x-4">
        <ResizableLogo size={100} />
      </div>
      <div className="flex space-x-6 text-sm md:text-base">
        <Link href="/about" className="text-gray-800 dark:text-white hover:underline">
          About
        </Link>
        <Link href="/contact-us" className="text-gray-800 dark:text-white hover:underline">
          Contact Us
        </Link>
        {user ? (
          <Link
            href="/dashboard"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href="/auth/login"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
