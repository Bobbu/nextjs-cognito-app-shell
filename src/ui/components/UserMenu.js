// components/UserMenu.js
"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import useAuthUser from "@/app/hooks/use-auth-user";
import { handleSignOut } from "@/lib/cognitoActions";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const router = useRouter();
  const user = useAuthUser();
  const { name, given_name, family_name } = user ?? {};

  const onSignOut = async () => {
    try {
      await handleSignOut(); // probably clears cookies/session
      router.push("/"); // ✅ client-side redirect
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  let initials = "U";

  if (given_name && family_name) {
    initials = (given_name[0] ?? "") + (family_name[0] ?? "");
  } else if (name) {
    initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="flex items-center space-x-2 text-sm font-medium text-gray-800 dark:text-gray-200">
        <UserCircleIcon className="w-6 h-6 text-gray-500 dark:text-gray-300" />
        <span>{initials}</span>
      </MenuButton>

      <MenuItems className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
        <div className="py-1">
          <MenuItem>
            {({ focus }) => (
              <Link
                href="/dashboard/profile"
                className={`block px-4 py-2 text-sm ${
                  focus
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                <span className="flex items-center space-x-2">
                  <UserCircleIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                  <span>Profile</span>
                </span>
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <Link
                href="/dashboard/settings"
                className={`block px-4 py-2 text-sm ${
                  focus
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Cog6ToothIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                  <span>Settings</span>
                </span>
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <button
                onClick={onSignOut}
                className={`w-full text-left block px-4 py-2 text-sm ${
                  focus
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                <span className="flex items-center space-x-2">
                  <PowerIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                  <span>Sign Out</span>
                </span>
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
