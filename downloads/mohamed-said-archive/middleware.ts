import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected routes
export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin-session")?.value;
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute && token !== "authenticated-admin") {
    // Redirect to a login page or home if not authenticated
    return NextResponse.redirect(new URL("/?error=unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
