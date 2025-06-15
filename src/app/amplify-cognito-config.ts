// app/amplify-cognito-config.ts
"use client";

import { useEffect } from "react";
import { Amplify, type ResourcesConfig } from "aws-amplify";

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: String(process.env.NEXT_PUBLIC_USER_POOL_ID),
    userPoolClientId: String(process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID),
  },
};

export default function ConfigureAmplifyClientSide() {
  useEffect(() => {
    Amplify.configure(
      {
        Auth: authConfig,
      },
      { ssr: true }
    );
  }, []);

  return null;
}
