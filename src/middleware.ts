import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log(token);

  if (
    token &&
    (request.nextUrl.pathname.includes("log-in") ||
      request.nextUrl.pathname.includes("sign-up"))
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (
    !token &&
    !request.nextUrl.pathname.includes("log-in") &&
    !request.nextUrl.pathname.includes("sign-up")
  ) {
    return NextResponse.redirect(new URL("/auth/log-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/auth/:path*", "/bills/:path*"],
};
