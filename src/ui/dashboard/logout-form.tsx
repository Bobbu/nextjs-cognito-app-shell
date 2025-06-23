"use client";

import { PowerIcon } from "@heroicons/react/24/outline";
import { handleSignOut } from "@/lib/cognitoActions";
import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const router = useRouter();

  const onSignOut = async () => {
    try {
      await handleSignOut();  
      router.push("/");       // client-side redirect
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };
  return (
    <form action={onSignOut}>
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
