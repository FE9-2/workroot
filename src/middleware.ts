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
    const isValidToken = token && !isTokenExpired(token);

    if (!isValidToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// JWT 토큰 디코딩 함수
function decodeJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT 토큰 디코딩 오류:", error);
    return null;
  }
}

// 토큰 만료 체크 함수
function isTokenExpired(token: string) {
  const decodedToken = decodeJwt(token);
  if (!decodedToken) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public/).*)"],
};
