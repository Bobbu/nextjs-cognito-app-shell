// src/middleware.ts
import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "./utils/amplify-server-utils";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const isOnAdminArea = request.nextUrl.pathname.startsWith("/dashboard/admins");

  // Allow anonymous access to non-dashboard routes
  if (!isOnDashboard) {
    return response;
  }

  // Protect dashboard routes
  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  if (isOnAdminArea && !user.isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return response;
}

export const config = {
  /*
   * Match all request paths except for the ones starting with
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
