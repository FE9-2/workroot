import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { decodeJwt } from "@/middleware";
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
  const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json({ message: "Environment variables not set" }, { status: 500 });
  }

  try {
    // Google Access Token 요청
    const { data: tokenResponse } = await axios.post(GOOGLE_TOKEN_URL, null, {
      params: {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      },
    });

    const { id_token } = tokenResponse;
    const decodedIdToken = decodeJwt(id_token);
    if (!decodedIdToken) {
      return NextResponse.json({ message: "Invalid ID token" }, { status: 400 });
    }

    const googleUser: { signup: OauthSignupUser; login: OauthLoginUser } = {
      signup: {
        role,
        name: decodedIdToken.name,
        token: id_token,
      },
      login: {
        token: id_token,
        redirectUri,
      },
    };

    // role이 APPLICANT일 경우 추가 정보 설정
    if (role === "APPLICANT") {
      googleUser.signup.storeName = "x";
      googleUser.signup.storePhoneNumber = "x";
      googleUser.signup.location = "x";
    }

    const processUser = async () => {
      if (action === "signup") {
        try {
          const response = await apiClient.post<OauthResponse>(`/oauth/sign-up/${provider}`, googleUser.signup);
          console.log("구글 회원가입 성공:", response.data);
        } catch (error: any) {
          if (error.response?.status === 400) {
            console.log("이미 등록된 사용자입니다. 로그인 시도 중...");
            await loginUser();
          } else {
            throw new Error("회원가입 중 서버 오류");
          }
        }
        return NextResponse.redirect(new URL("/mypage", request.url));
      } else if (action === "login") {
        await loginUser();
      } else {
        throw new Error("잘못된 작업 에러");
      }
    };

    const loginUser = async () => {
      try {
        const { data: loginResponse } = await axios.post<OauthResponse>(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/oauth/login/${provider}`,
          googleUser.login
        );
        console.log("구글 로그인 성공:", loginResponse);

        // 쿠키 저장
        const { accessToken, refreshToken } = loginResponse;
        setCookies(accessToken, refreshToken);
      } catch (error: any) {
        if (error.response?.status === 403) {
          console.log("회원가입이 필요합니다. 회원가입 페이지로 이동합니다...");
          throw new RedirectError("/signup");
        } else {
          console.error("구글 로그인 중 오류:", error.message || error);
          throw new Error("로그인 중 서버 오류");
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
    } catch (error) {
      if (error instanceof RedirectError) {
        return NextResponse.redirect(new URL(error.redirectPath, request.url));
      }
      throw error;
    }
  } catch (error: any) {
    console.error("OAuth 처리 중 오류:", error.message || error);
    return NextResponse.json({ message: error.message || "서버 오류" }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/mypage", request.url));
};
