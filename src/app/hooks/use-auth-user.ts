import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useEffect, useState } from "react";

// Optional: Define a type guard for sessions with tokens
type AuthSessionWithTokens = {
  tokens: {
    accessToken: {
      payload: { [key: string]: any };
    };
  };
};

export default function useAuthUser() {
  const [user, setUser] = useState<Record<string, any> | null>(null);

  async function loadUser() {
    try {
      const session = await fetchAuthSession();
      if (!("tokens" in session)) {
        setUser(null);
        return;
      }

      const tokenSession = session as AuthSessionWithTokens;
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const groups: string[] = tokenSession.tokens.accessToken.payload["cognito:groups"] || [];

      setUser({
        ...currentUser,
        ...attributes,
        isAdmin: groups.includes("Admins"),
      });
    } catch (err) {
      setUser(null); // fallback in case of error
    }
  }

  useEffect(() => {
    loadUser();

    const listener = (data: { payload: { event: string } }) => {
      const { event } = data.payload;
      if (
        event === "signedIn" ||
        event === "signedOut" ||
        event === "tokenRefresh" ||
        event === "tokenRefresh_failure"
      ) {
        loadUser();
      }
    };

    const unsubscribe = Hub.listen("auth", listener);
    return () => unsubscribe();
  }, []);

  return user;
}
