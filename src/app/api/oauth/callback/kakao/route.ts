import { NextRequest, NextResponse } from "next/server";
import { OauthUser } from "@/types/oauth/oauthReq";
import apiClient from "@/lib/apiClient";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code) {
    return NextResponse.json({ message: "Code not found" }, { status: 400 });
  }

  if (!state) {
    return NextResponse.json({ message: "State not found" }, { status: 400 });
  }

  let parsedState;
  try {
    parsedState = JSON.parse(decodeURIComponent(state));
  } catch (error) {
    console.error("Failed to parse state:", error);
    return NextResponse.json({ message: "Invalid state format" }, { status: 400 });
  }
  const { provider, role } = parsedState;

  const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json({ message: "Environment variables not set" }, { status: 500 });
  }

  const kakaoUser: OauthUser = {
    role: role,
    name: "", // 기본값 설정 (빈 문자열)
    token: code, // 인가코드 그대로 전달
    redirectUri: redirectUri,
  };

  try {
    // 인가코드를 포함한 데이터를 백엔드로 전달
    const kakaoSignupResponse = await apiClient.post(`/oauth/sign-up/${provider}`, kakaoUser);
    console.log("카카오 회원가입 성공:", kakaoSignupResponse.data);

    // 사용자 정보를 클라이언트에 반환
    // return NextResponse.json(kakaoSignupResponse.data);
  } catch (error: any) {
    // 에러 타입 명시
    console.error("카카오 회원가입 에러:", error.response?.data || error.message);

    // return NextResponse.json({ message: error.response?.data || "Error during Kakao signup" }, { status: 500 });
  }

  try {
    // 사용자 정보를 클라이언트에 반환
    const response = NextResponse.redirect("http://localhost:3000");
    response.cookies.set("user", JSON.stringify(kakaoUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1일
      path: "/",
    });
    return response;
  } catch (error: any) {
    console.error("카카오 회원가입 에러:", error.response?.data || error.message);
    return NextResponse.json({ message: error.response?.data || "서버에러" }, { status: 500 });
  }
};
