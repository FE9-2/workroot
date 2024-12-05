import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
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

  const KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
  const KAKAO_USER_INFO_URL = "https://kapi.kakao.com/v2/user/me";
  const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json({ message: "Environment variables not set" }, { status: 500 });
  }

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code: code,
  });

  try {
    // 액세스 토큰 요청
    const tokenResponse = await axios.post(KAKAO_TOKEN_URL, params);
    const { access_token } = tokenResponse.data;

    if (!access_token) {
      return NextResponse.json({ message: "Failed to retrieve access token" }, { status: 400 });
    }

    // 액세스 토큰을 사용하여 사용자 정보 요청
    const userInfoResponse = await axios.get(KAKAO_USER_INFO_URL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = userInfoResponse.data;

    const kakaoUser: OauthUser = {
      role: role,
      name: user.properties?.nickname,
      token: code, // 인가 코드 그대로 사용
      redirectUri: redirectUri,
    };

    try {
      const kakaoSignupResponse = await apiClient.post(`/oauth/sign-up/${provider}`, kakaoUser);
      console.log("카카오 회원가입 성공:", kakaoSignupResponse.data);
    } catch (error) {
      const errorMessage = (error as any).response?.data;
      console.log("카카오 회원가입 에러", errorMessage);
    }

    // 사용자 정보를 클라이언트에 반환
    return NextResponse.json(kakaoUser);
  } catch (error) {
    console.error("Kakao login error:", error);

    // Axios 에러인 경우 상세 정보 제공
    if (axios.isAxiosError(error)) {
      const { response } = error;
      if (response) {
        return NextResponse.json(
          { message: response.data?.msg || "Error during Kakao API call" },
          { status: response.status || 500 }
        );
      }
    }

    // 기타 에러 처리
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
