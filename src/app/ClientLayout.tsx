// app/ClientLayout.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { Providers } from "./providers";
import TopNav from "@/ui/components/TopNav";

const authConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID!,
    },
  },
};

export default function ClientLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    Amplify.configure(authConfig, { ssr: true });
  }, []);

  return (
    <Providers>
      <TopNav />
      {children}
    </Providers>
  );
}
