"use client";
import { ExclamationCircleIcon, KeyIcon } from "@heroicons/react/24/outline";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleUpdatePassword } from "@/lib/cognitoActions";

export default function UpdatePasswordForm() {
  const [status, dispatch] = useFormState(handleUpdatePassword, undefined);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 dark:bg-gray-800 p-4 md:p-6">
        <div className="mb-4">
          <label
            htmlFor="current_password"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Current Password
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="current_password"
              type="password"
              name="current_password"
              placeholder="Enter current password"
              required
              minLength={6}
              className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-10 text-sm text-black dark:text-white outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-300 peer-focus:text-gray-900 dark:peer-focus:text-white" />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="new_password"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="new_password"
              type="password"
              name="new_password"
              placeholder="Enter new password"
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
          {status === "error" && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">
                There was an error updating password.
              </p>
            </>
          )}
          {status === "success" && (
            <p className="text-sm text-green-500">Password updated successfully.</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <UpdateButton />
      </div>
    </form>
  );
}

function UpdateButton() {
  const { pending } = useFormStatus();
  return <Button aria-disabled={pending}>Update Password</Button>;
}
