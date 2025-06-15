// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/ui/fonts";
import dynamic from "next/dynamic";
import { Providers } from "./providers";
import TopNav from "@/ui/components/TopNav";
import ConfigureAmplifyClientSide from "./amplify-cognito-config";

export const metadata: Metadata = {
  title: "Next.js Cognito Authentication",
  description: "Cognito authenticated Next.js app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-white text-black dark:bg-gray-900 dark:text-white`}
      >
        <ConfigureAmplifyClientSide />
        <Providers>
          <TopNav />
          <main className="flex min-h-screen flex-col p-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
