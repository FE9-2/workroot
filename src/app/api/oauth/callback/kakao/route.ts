import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import apiClient from "@/lib/apiClient";
import { OauthLoginUser, OauthResponse, OauthSignupUser } from "@/types/oauth/oauth";
import { cookies } from "next/headers";
import { RedirectError } from "@/utils/oauthLoginError";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    return NextResponse.json({ message: `${!code ? "Code" : "State"} not found` }, { status: 400 });
  }

  let parsedState;
  try {
    parsedState = JSON.parse(decodeURIComponent(state));
  } catch {
    return NextResponse.json({ message: "Invalid state format" }, { status: 400 });
  }

  const { provider, action, role } = parsedState;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  if (!redirectUri) {
    return NextResponse.json({ message: "Environment variables not set" }, { status: 500 });
  }

  const kakaoUser: { signup: OauthSignupUser; login: OauthLoginUser } = {
    signup: {
      role: role || "user", // 기본 역할 설정
      name: "", // Kakao는 이름을 제공하지 않으므로 기본값
      token: code, // 인가 코드 전달
    },
    login: {
      token: code, // 인가 코드 전달
      redirectUri, // 리다이렉트 URI 포함
    },
  };

  const processUser = async () => {
    if (action === "signup") {
      try {
        const response = await apiClient.post(`/oauth/sign-up/${provider}`, kakaoUser.signup);
        console.log("카카오 회원가입 성공:", response.data);
      } catch (error: any) {
        if (error.response?.status === 400) {
          console.log("이미 등록된 사용자입니다. 로그인 시도 중...");
          await loginUser();
        } else {
          throw new Error("회원가입 중 서버 오류");
        }
      }
    } else if (action === "login") {
      await loginUser();
    } else {
      throw new Error("Invalid action");
    }
  };

  const loginUser = async () => {
    try {
      const { data: loginResponse } = await axios.post<OauthResponse>(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/oauth/login/${provider}`,
        kakaoUser.login
      );
      console.log("카카오 로그인 성공:", loginResponse);

      // 쿠키 저장
      const { accessToken, refreshToken } = loginResponse;
      setCookies(accessToken, refreshToken);
    } catch (error: any) {
      if (error.response?.status === 403) {
        console.log("회원가입이 필요합니다. 회원가입 시도 중...");
        //회원가입 페이지로 리다이렉트
        throw new RedirectError("/signup");
      } else {
        throw new Error("회원가입 중 서버 오류");
      }
    }
  };

  const setCookies = (accessToken: string, refreshToken: string) => {
    cookies().set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    cookies().set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  };

  try {
    await processUser();
  } catch (error: any) {
    console.error("OAuth 처리 중 오류:", error.message || error);
    return NextResponse.json({ message: error.message || "서버 오류" }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/mypage", request.url));
};
