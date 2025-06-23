import { lusitana } from "@/ui/fonts";
import UpdateProfileForm from "@/ui/profile-settings/update-profile-form";
import UpdatePasswordForm from "@/ui/profile-settings/update-password-form";
import UpdateEmailForm from "@/ui/profile-settings/update-email-form";
import ThemeSwitch from "@/app/components/ThemeSwitch";
export default function Profile() {
  return (
    <main>
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className="text-4xl font-bold mb-6">Profile Settings</h1>      
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <UpdateProfileForm />
        <UpdatePasswordForm />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        <UpdateEmailForm />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        <ThemeSwitch />
      </div>
    </main>
  );
}
