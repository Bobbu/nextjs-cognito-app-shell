"use client";

import { PowerIcon } from "@heroicons/react/24/outline";
import { handleSignOut } from "@/lib/cognitoActions";

export default function LogoutForm() {
  return (
    <form action={handleSignOut}>
      <button
        className="flex items-center gap-2 w-full rounded-md p-2 px-3 text-sm font-medium transition-colors
                   bg-gray-50 text-gray-800 hover:bg-sky-100 hover:text-blue-600
                   dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <PowerIcon className="w-5 h-5" />
        <span className="hidden md:block">Sign Out</span>
      </button>
    </form>
  );
}
