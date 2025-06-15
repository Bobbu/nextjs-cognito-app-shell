// ui/auth/ConfirmSignUpForm.tsx
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
import { handleConfirmSignUp } from "@/lib/cognitoActions";
import SendVerificationCode from "./SendVerificationCode";
import FormField from "@/ui/components/FormField";

export default function ConfirmSignUpForm() {
  const [errorMessage, dispatch] = useFormState(handleConfirmSignUp, undefined);
  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-800 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl text-gray-900 dark:text-white`}>
          Please confirm your account.
        </h1>
        <div className="w-full space-y-4">
          <FormField
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email address"
            Icon={AtSymbolIcon}
          />
          <FormField
            id="code"
            name="code"
            type="text"
            label="Code"
            placeholder="Enter code"
            Icon={KeyIcon}
          />
        </div>
        <ConfirmButton />
        {errorMessage && (
          <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </div>
        )}
        <SendVerificationCode />
      </div>
    </form>
  );
}


function ConfirmButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Confirm <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
