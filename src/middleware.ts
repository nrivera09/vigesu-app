import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const protectedRoutes = ["/es/dashboard", "/en/dashboard"];

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const pathname = request.nextUrl.pathname;
  const hasPreviewFlag = request.nextUrl.searchParams.has("preview");

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // ⚠️ Si está protegida pero tiene ?preview => permitir acceso (para PDF)
  if (isProtected && !token && hasPreviewFlag) {
    return intlMiddleware(request);
  }

  // 🔒 Si está protegida y no hay token, redirigir
  if (isProtected && !token) {
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
