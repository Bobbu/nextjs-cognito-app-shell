// app/page.tsx
"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/ui/fonts";
import Image from "next/image";
import useAuthUser from "@/app/hooks/use-auth-user";

export default function Page() {
  const user = useAuthUser();

  return (
    <main className="flex min-h-screen flex-col p-6">

      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 dark:bg-gray-800 px-6 py-10 md:w-2/5 md:px-20">
          <p
            className={`${lusitana.className} text-xl text-gray-800 dark:text-white md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to Any Stupid Idea.</strong>
          </p>
          <Link
            href={user ? "/dashboard" : "/auth/login"}
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>{user ? "Go to Dashboard" : "Sign In"}</span>
            <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
            priority
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
            priority
          />
        </div>
      </div>
    </main>
  );
}
