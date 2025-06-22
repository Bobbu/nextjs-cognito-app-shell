"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ResponsiveLogo() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDarkMode = resolvedTheme === "dark";
  const logoSrc = isDarkMode ? "/logo-dark.png" : "/logo-light.png";

  return (
    <Link href="/" className="block w-auto max-w-xs">
      <Image
        src={logoSrc}
        alt="Company Logo"
        width={500}
        height={200}
        className="w-full h-auto"
        priority
      />
    </Link>
  );
}
