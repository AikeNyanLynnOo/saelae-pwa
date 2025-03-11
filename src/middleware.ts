import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authCookieName =
  process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || process.env.AUTH_COOKIE_NAME;

export function middleware(request: NextRequest) {
  const token = request.cookies.get(authCookieName || "app_token");

  // Public paths that don't require authentication
  const publicPaths = ["/welcome", "/auth"];
  const isPublicPath = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (!token && !isPublicPath) {
    const redirectUrl = new URL("/auth", request.url);
    redirectUrl.searchParams.set("session_expired", "true");
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
