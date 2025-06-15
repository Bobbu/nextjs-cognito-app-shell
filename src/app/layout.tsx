// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/ui/fonts";
import ConfigureAmplifyClientSide from "./amplify-cognito-config";
import { Providers } from "./providers";
import TopNav from "@/ui/components/TopNav"; // 👈 Add this import

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
      <body className={`${inter.className} antialiased bg-white text-black dark:bg-gray-900 dark:text-white`}>
        <ConfigureAmplifyClientSide />
        <Providers>
          <TopNav /> {/* 👈 Insert TopNav here */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
