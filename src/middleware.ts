import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 인증이 필요없는 공개 경로들을 정의
  const publicPatterns = [
    "/",
    "/_next",
    "/favicon.ico",
    "/login",
    "/signup",
    "/signup/applicant",
    "/signup/owner",
    "/api/auth/refresh",
    /\.(jpg|jpeg|gif|png|svg)$/,
  ];

  // 현재 요청된 경로가 공개 경로에 해당하는지 확인
  const isPublicPath = publicPatterns.some((pattern) => {
    if (typeof pattern === "string") {
      return request.nextUrl.pathname.startsWith(pattern);
    }
    return pattern.test(request.nextUrl.pathname);
  });

  // 공개 경로가 아닌 경우에만 토큰 체크
  if (!isPublicPath) {
    const token = request.cookies.get("accessToken")?.value;

    if (!token) {
      // 토큰이 없는 경우 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // 토큰이 있는 경우 API 요청에 토큰 추가
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("Authorization", `Bearer ${token}`);

      // API 요청인 경우 헤더만 수정
      if (request.nextUrl.pathname.startsWith("/api/")) {
        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      }

      // 일반 페이지 요청의 경우 그대로 진행
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
