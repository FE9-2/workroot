import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 인증이 필요없는 공개 경로들을 정의
  const publicPatterns = ["/", "/login", "/signup", "/_next", "/favicon.ico", /\.(jpg|jpeg|gif|png|svg)$/];

  // 현재 요청된 경로가 공개 경로에 해당하는지 확인
  const isPublicPath = publicPatterns.some((pattern) => {
    if (typeof pattern === "string") {
      return request.nextUrl.pathname.startsWith(pattern);
    }
    return pattern.test(request.nextUrl.pathname);
  });

  // 쿠키에서 인증 토큰 확인
  const token = request.cookies.get("accessToken")?.value;

  // 로그인되지 않은 사용자가 보호된 페이지 접근 시 로그인 페이지로 리다이렉트
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// 미들웨어 적용 경로 설정
export const config = {
  matcher: [
    /*
     * 다음으로 시작하는 경로를 제외한 모든 요청 경로에 매칭:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘)
     * - public 폴더
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
