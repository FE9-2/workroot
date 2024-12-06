import { NextRequest, NextResponse } from "next/server";
import { OauthLoginUser, OauthResponse, OauthSignupUser } from "@/types/oauth/oauth";
import axios from "axios";

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
  console.log("parsedState:", parsedState);

  const { provider, action, role } = parsedState;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  if (!redirectUri) {
    return NextResponse.json({ message: "Environment variables not set" }, { status: 500 });
  }

  try {
    if (action === "signup") {
      // 회원가입 로직
      const signupUser: OauthSignupUser = {
        role: role || "user", // role 값이 없으면 기본값으로 "user" 설정
        name: "", // 회원가입 시 이름은 추후 API로 받아오거나 기본값으로 처리
        token: code, // 인가코드 전달
        redirectUri,
      };
      console.log("회원가입 시도:", signupUser);

      const signupResponse = await axios.post<OauthResponse>(`/api/oauth/signup`, { provider, ...signupUser });
      console.log("회원가입 성공:", signupResponse.data);
    } else if (action === "login") {
      // 로그인 로직
      const loginUser: OauthLoginUser = {
        token: code,
        redirectUri,
      };
      console.log("로그인 시도", loginUser);

      const loginResponse = await axios.post<OauthResponse>(`/api/oauth/login/${provider}`, { provider, ...loginUser });
      console.log("로그인 성공:", loginResponse.data);
    } else {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }
  } catch (error: any) {
    console.error(`${provider} ${action} 에러:`, error);
    return NextResponse.json({ message: error.response?.data || "Internal Server Error" }, { status: 500 });
  }
};
