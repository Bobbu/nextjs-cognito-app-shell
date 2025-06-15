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
import SendVerificationCode from "./send-verification-code-form";

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
            type="email"
            label="Email"
            placeholder="Enter your email address"
            Icon={AtSymbolIcon}
          />
          <FormField
            id="code"
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

function FormField({
  id,
  type,
  label,
  placeholder,
  Icon,
}: {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  Icon: React.ElementType;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-xs font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          required
          placeholder={placeholder}
          className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 py-[9px] pl-10 text-sm text-black dark:text-white outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-300 peer-focus:text-gray-900 dark:peer-focus:text-white" />
      </div>
    </div>
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
