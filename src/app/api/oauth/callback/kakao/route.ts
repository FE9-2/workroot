import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ message: "Code not found" }, { status: 400 });
  }

  // const KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
  // const params = new URLSearchParams();
  // params.append("grant_type", "authorization_code");
  // const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  // const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  // if (!clientId || !redirectUri) {
  //   return NextResponse.json({ message: "Environment variables not set" }, { status: 500 });
  // }

  // params.append("client_id", clientId); // 카카오 REST API 키
  // params.append("redirect_uri", redirectUri); // Redirect URI
  // params.append("code", code);

  // try {
  //   // 액세스 토큰 요청
  //   const response = await axios.post(KAKAO_TOKEN_URL, params);
  //   const { access_token } = response.data;
  //   console.log("Kakao access token:", access_token);

  //   // 액세스 토큰을 사용하여 사용자 정보 요청
  //   const userInfoResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
  //     headers: {
  //       Authorization: `Bearer ${access_token}`,
  //     },
  //   });

  //   const user = userInfoResponse.data;
  //   console.log("Kakao user:", user);

  //   // 사용자 정보를 클라이언트에 반환
  //   return NextResponse.json(user);
  // } catch (error) {
  //   console.error("Kakao login error:", error);
  //   return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  // }
};
