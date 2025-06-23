// ui/auth/LoginForm.tsx
"use client";

import { lusitana } from "@/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleSignIn } from "@/lib/cognitoActions";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/ui/components/FormField"; 


export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(handleSignIn, undefined);
  const emailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleForgotPassword = () => {
    const email = emailRef.current?.value ?? "no value";
    router.push(`/auth/reset-password/submit?email=${encodeURIComponent(email)}`);
  };

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-800 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl text-gray-900 dark:text-white`}>
          Please sign in to continue.
        </h1>
        <div className="w-full">

          {/* Email */}
          <FormField
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email address"
            Icon={AtSymbolIcon}
            ref={emailRef}
            required
          />

          {/* Password */}
          <FormField
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter password"
            Icon={KeyIcon}
            required
            minLength={6}
          />
        </div>

        <LoginButton />

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="mt-2 text-blue-500 underline"
          >
            Forgot password? Click here.
          </button>
        </div>

        <div className="flex justify-center">
          <Link href="/auth/signup" className="mt-2 text-blue-500">
            {"Don't have an account? "} Sign up.
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

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Sign In <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
