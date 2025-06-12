"use client";
import { ExclamationCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleUpdateUserAttributes } from "@/lib/cognitoActions";
import useAuthUser from "@/app/hooks/use-auth-user";

export default function UpdateProfileForm() {
  const user = useAuthUser();
  const [status, dispatch] = useFormState(handleUpdateUserAttributes, "");

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 dark:bg-gray-800 p-4 md:p-6">
        {/* Full name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Full Name
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="name"
              type="text"
              name="name"
              minLength={4}
              placeholder="Enter full name"
              required
              defaultValue={user?.name ?? ""}
              className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-10 text-sm text-black dark:text-white outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-300 peer-focus:text-gray-900 dark:peer-focus:text-white" />
            <input
              id="current_name"
              type="hidden"
              name="current_name"
              defaultValue={user?.name ?? ""}
            />
          </div>
        </div>

        {/* Given name */}
        <div className="mb-4">
          <label
            htmlFor="given_name"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            First Name
          </label>
          <input
            id="given_name"
            type="text"
            name="given_name"
            placeholder="Enter first name"
            required
            defaultValue={user?.given_name ?? ""}
            className="block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-sm text-black dark:text-white outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>

        {/* Family name */}
        <div className="mb-4">
          <label
            htmlFor="family_name"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Last Name
          </label>
          <input
            id="family_name"
            type="text"
            name="family_name"
            placeholder="Enter last name"
            required
            defaultValue={user?.family_name ?? ""}
            className="block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-sm text-black dark:text-white outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>

        {/* Status message */}
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {status === "error" && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">
                There was an error updating your profile.
              </p>
            </>
          )}
          {status === "success" && (
            <p className="text-sm text-green-500">
              Profile updated successfully.
            </p>
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
  return <Button aria-disabled={pending}>Update Profile</Button>;
}
