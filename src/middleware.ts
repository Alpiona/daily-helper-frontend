import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.includes("login") ||
    request.nextUrl.pathname.includes("sign-up")
  ) {
    return NextResponse.next();
  }

  // return NextResponse.next();
  const sessionCookie = request.cookies.get("session")?.value;

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    !sessionCookie.hasOwnProperty("token") ||
    !sessionCookie.hasOwnProperty("email")
  ) {
    request.cookies.delete("session");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/index", "/bills/:path*"],
};
