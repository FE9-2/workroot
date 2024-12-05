import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { OauthUser } from "@/types/oauth/oauthReq";

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
  console.log("Kakao Role:", role);
  console.log("Kakao Provider:", provider);

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
    console.log("Kakao access token:", access_token);

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
    console.log("Kakao user:", user);

    const kakaoUser: OauthUser = {
      role: role,
      name: user.properties?.nickname,
      token: code,
      // id: user.id,
      // nickname: user.properties?.nickname,
      // email: user.kakao_account?.email,
      // profileImage: user.properties?.profile_image,
    };

    console.log("Formatted Kakao user:", kakaoUser);

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
