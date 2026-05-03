import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PUBLIC_ROUTES, ROLE_ROUTES } from "@/constants/routes";

const API_AUTH_PREFIX = "/api/auth";

export default auth(async (req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session?.user;
  const pathname = nextUrl.pathname;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isApiAuthRoute = pathname.startsWith(API_AUTH_PREFIX);
  const isApiRoute = pathname.startsWith("/api");
  const isStaticFile = pathname.match(
    /\.(ico|png|jpg|jpeg|svg|css|js|woff|woff2|ttf|eot)$/,
  );

  if (isStaticFile || isApiRoute) {
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (isLoggedIn && isPublicRoute) {
    const userRole = session.user.role;
    if (userRole === "ORG_ADMIN") {
      return NextResponse.redirect(new URL("/coaches", nextUrl));
    }
    return NextResponse.redirect(new URL("/atletas", nextUrl));
  }

  if (isLoggedIn && session.user.role) {
    const userRole = session.user.role;
    const allowedRoutes = ROLE_ROUTES[userRole];

    const isRootPath = pathname === "/";
    if (isRootPath) {
      return NextResponse.redirect(new URL("/atletas", nextUrl));
    }

    const requestedRoute = "/" + pathname.split("/")[1];
    const hasAccess = allowedRoutes.some((route) =>
      requestedRoute.startsWith(route),
    );

    if (!hasAccess) {
      return NextResponse.redirect(new URL("/atletas", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
