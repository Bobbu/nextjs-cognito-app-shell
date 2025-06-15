// ui/auth/SignupForm.tsx
"use client";

import { lusitana } from "@/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleSignUp } from "@/lib/cognitoActions";
import Link from "next/link";
import FormField from "@/ui/components/FormField";

export default function SignUpForm() {
  const [errorMessage, dispatch] = useFormState(handleSignUp, undefined);
  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-800 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl text-gray-900 dark:text-white`}>
          Please create an account.
        </h1>
        <div className="w-full space-y-4">
          <FormField
            id="name"
            name="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            Icon={UserCircleIcon}
            minLength={4}
            required
          />
          <FormField
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email address"
            Icon={AtSymbolIcon}
            required
          />
          <FormField
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter password"
            Icon={KeyIcon}
            minLength={6}
            required
          />
        </div>
        <SignUpButton />
        <div className="flex justify-center">
          <Link href="/auth/login" className="mt-2 cursor-pointer text-blue-500">
            Already have an account? Log in.
          </Link>
        </div>
        {errorMessage && (
          <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </div>
        )}
      </div>
    </form>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Create account <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
