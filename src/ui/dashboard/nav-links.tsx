"use client";
import useAuthUser from "@/app/hooks/use-auth-user";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const user = useAuthUser();
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/dashboard", icon: HomeIcon },
    { name: "Invoices", href: "/dashboard/invoices", icon: DocumentDuplicateIcon },
    { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
  ];

  if (user && user.isAdmin) {
    links.push({
      name: "Admin Area",
      href: "/dashboard/admins",
      icon: BuildingOfficeIcon,
    });
  }

  return (
    <>
      {links.map(({ name, href, icon: Icon }) => (
        <Link
          key={name}
          href={href}
          className={clsx(
            "flex items-center gap-2 rounded-md p-2 px-3 text-sm font-medium transition-colors",
            "bg-gray-50 text-gray-800 hover:bg-sky-100 hover:text-blue-600",
            "dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white",
            {
              "bg-sky-100 text-blue-600 dark:bg-blue-900 dark:text-white":
                pathname === href,
            }
          )}
        >
          <Icon className="w-5 h-5" />
          <span className="hidden md:block">{name}</span>
        </Link>
      ))}
    </>
  );
}
