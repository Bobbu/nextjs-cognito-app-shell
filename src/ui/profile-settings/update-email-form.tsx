"use client";
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import {
  handleConfirmUserAttribute,
  handleUpdateUserAttribute,
} from "@/lib/cognitoActions";
import useAuthUser from "@/app/hooks/use-auth-user";

export default function UpdateEmailForm() {
  const user = useAuthUser();
  const [status, dispatch] = useFormState(handleUpdateUserAttribute, "");
  const [confirmStatus, dispatchConfirm] = useFormState(
    handleConfirmUserAttribute,
    undefined
  );

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 dark:bg-gray-800 p-4 md:p-6">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              defaultValue={user?.email}
              className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-10 text-sm text-black dark:text-white outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-300 peer-focus:text-gray-900 dark:peer-focus:text-white" />
            <input
              id="current_email"
              type="hidden"
              name="current_email"
              defaultValue={user?.email}
            />
          </div>
        </div>

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {status === "error" && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">
                There was an error updating email.
              </p>
            </>
          )}
          {status === "success" && (
            <p className="text-sm text-green-500">
              Email has been updated successfully.
            </p>
          )}
        </div>

        {status?.includes("code") && (
          <>
            <div className="mb-1">
              <label
                htmlFor="code"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                {status}
              </label>
              <div className="relative mt-2 rounded-md">
                <input
                  id="code"
                  type="text"
                  name="code"
                  placeholder="Enter code to verify email"
                  required
                  minLength={6}
                  className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-10 text-sm text-black dark:text-white outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-300 peer-focus:text-gray-900 dark:peer-focus:text-white" />
              </div>
            </div>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {confirmStatus === "error" && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">
                    There was an error verifying your email
                  </p>
                </>
              )}
              {confirmStatus === "success" && (
                <p className="text-sm text-green-500">
                  Email verified successfully
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        {status?.includes("code") ? (
          <VerifyButton dispatch={dispatchConfirm} />
        ) : (
          <UpdateButton />
        )}
      </div>
    </form>
  );
}

function UpdateButton() {
  const { pending } = useFormStatus();
  return <Button aria-disabled={pending}>Update Email</Button>;
}

function VerifyButton({ dispatch }: { dispatch: (payload: FormData) => void }) {
  const { pending } = useFormStatus();
  return (
    <Button aria-disabled={pending} formAction={dispatch}>
      Verify Email
    </Button>
  );
}
