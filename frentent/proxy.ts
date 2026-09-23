import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/docs", "/login", "/contact", "/about"];
const AUTH_COOKIE = "authToken";

const isPathAllowed = (pathname: string, allowed: string[]) =>
  allowed.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasToken = Boolean(request.cookies.get(AUTH_COOKIE)?.value);

  if (pathname === "/login" && hasToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isPathAllowed(pathname, PUBLIC_PATHS) || hasToken) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("auth", "login");
  loginUrl.searchParams.set("next", pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};