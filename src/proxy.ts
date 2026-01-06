import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/conversations", "/users"];
const authRoutes = ["/"];

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.includes(pathname);

  if (!accessToken && refreshToken && isProtectedRoute) {
    console.log("111");
    try {
      // Gọi sang Backend Express để lấy AccessToken mới
      const res = await fetch(`http://localhost:3000/api/auth/refresh`, {
        method: "POST",
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      });

      console.log('res', res)

      if (res.ok) {
        const nextResponse = NextResponse.next();

        // Lấy các Set-Cookie từ Backend (chứa accessToken mới) và đính vào response gửi về trình duyệt
        const setCookie = res.headers.get("set-cookie");
        if (setCookie) {
          nextResponse.headers.set("set-cookie", setCookie);
        }
        return nextResponse;
      }
    } catch (error) {
      console.error("Refresh token failed in middleware:", error);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (!accessToken && !refreshToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/users", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
