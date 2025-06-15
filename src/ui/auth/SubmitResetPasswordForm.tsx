// ui/auth/SubmitResetPasswordForm.tsx
"use client";

import { lusitana } from "@/ui/fonts";
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleResetPassword } from "@/lib/cognitoActions";
import { useSearchParams } from "next/navigation";
import FormField from "@/ui/components/FormField";

export default function SubmitResetPasswordForm() {
  const searchParams = useSearchParams();
  const emailRef = searchParams.get("email") ?? "";
  const [errorMessage, dispatch] = useFormState(handleResetPassword, undefined);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-800 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl text-gray-900 dark:text-white`}>
          Please enter your email to get confirmation code.
        </h1>
        <div className="w-full">
          <div>
            <label
              htmlFor="email"
              className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
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
          </div>
        </div>
        <SendConfirmationCodeButton />
        {errorMessage && (
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </div>
        )}
      </div>
    </form>
  );
}

function SendConfirmationCodeButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Send Code <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
