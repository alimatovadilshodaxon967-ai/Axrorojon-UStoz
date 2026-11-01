import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("yz_token")?.value;
  const { pathname } = request.nextUrl;

  // Statik resurslar va API so'rovlarni o'tkazib yuborish
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/avatars") ||
    pathname === "/favicon.ico" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const isAuthPage = pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");

  // Agar foydalanuvchi tizimga kirmagan bo'lsa -> Loginga yo'naltirish
  if (!token && !isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // Agar tizimga kirgan bo'lsa va login sahifasiga kirmoqchi bo'lsa -> Dashboardga
  if (token && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|avatars|favicon.ico).*)"]
};
