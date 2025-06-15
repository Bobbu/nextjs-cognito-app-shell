// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/ui/fonts";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Next.js Cognito Authentication",
  description: "Cognito authenticated Next.js app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-white text-black dark:bg-gray-900 dark:text-white`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
