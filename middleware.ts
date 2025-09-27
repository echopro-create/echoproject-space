import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("sb:token"); // токен Supabase
  const url = req.nextUrl.clone();

  const protectedPaths = [
    "/messages",
    "/messages/new",
    "/recipients",
    "/recipients/add",
    "/settings",
    "/me",
    "/heartbeat"
  ];

  if (protectedPaths.some(path => url.pathname.startsWith(path)) && !session) {
    url.pathname = "/login";
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/messages/:path*",
    "/recipients/:path*",
    "/settings",
    "/me",
    "/heartbeat"
  ]
};