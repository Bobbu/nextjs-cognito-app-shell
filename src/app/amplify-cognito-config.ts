"use client";

import { useEffect } from "react";
import { Amplify } from "aws-amplify";
import { authConfig } from "@/lib/amplify-config";

export default function ConfigureAmplifyClientSide() {
  useEffect(() => {
    
    console.log("About to configure Amplify...");
    console.log("ENV:", process.env.NEXT_PUBLIC_USER_POOL_ID);
    
    Amplify.configure({ Auth: authConfig }, { ssr: true }); 
    
    console.log("Amplify configured.");

  }, []);

  return null;
}
