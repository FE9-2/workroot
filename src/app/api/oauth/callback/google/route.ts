import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { decodeJwt } from "@/middleware";
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

  // `state`를 JSON으로 파싱
  let parsedState;
  try {
    parsedState = JSON.parse(decodeURIComponent(state));
  } catch (error) {
    console.error("Failed to parse state:", error);
    return NextResponse.json({ message: "Invalid state format" }, { status: 400 });
  }

  const { provider, role } = parsedState;

  const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json({ message: "Environment variables not set" }, { status: 500 });
  }

  try {
    // Access Token 요청
    const tokenResponse = await axios.post(GOOGLE_TOKEN_URL, null, {
      params: {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      },
    });

    const { id_token } = tokenResponse.data;

    // id_token 디코딩
    const decodedIdToken = decodeJwt(id_token);
    if (!decodedIdToken) {
      return NextResponse.json({ message: "Invalid ID token" }, { status: 400 });
    }

    const googleUser: OauthUser = {
      role: role,
      name: decodedIdToken.name,
      token: id_token,
    };
    console.log("Google user:", googleUser);
    // OAuth 회원가입 API로 회원가입 요청
    try {
      const googleSignupResponse = await apiClient.post(`/oauth/sign-up/${provider}`, googleUser);
      console.log("구글 회원가입 성공:", googleSignupResponse.data);
    } catch (error) {
      const errorMessage = (error as any).response?.data;
      console.error("구글 회원가입 에러:", errorMessage);
    }

    // 사용자 정보를 클라이언트에 반환
    const response = NextResponse.redirect("http://localhost:3000");
    response.cookies.set("user", JSON.stringify(googleUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1일
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Google login error:", error);
    return NextResponse.json({ message: "서버에러" }, { status: 500 });
  }
};
