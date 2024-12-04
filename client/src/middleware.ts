import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { ssrSignedIn } from "./ssr/ssrSignedIn";

export function middleware(req: NextRequest) {
  const signedInUser = ssrSignedIn();
  if (!Boolean(signedInUser) && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)",
};
