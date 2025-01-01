import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { allowedRoutes, PagesURLS } from "./constants/urls";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isRouteAllowed = allowedRoutes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isRouteAllowed) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL(PagesURLS.products, request.url));
  }
  return NextResponse.redirect(new URL(PagesURLS.home, request.url));
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
