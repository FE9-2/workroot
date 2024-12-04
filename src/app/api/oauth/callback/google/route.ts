import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ message: "Code not found" }, { status: 400 });
  }

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

    const { access_token } = tokenResponse.data;
    console.log("Google access token:", access_token);

    // 사용자 정보 요청
    const userInfoResponse = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = userInfoResponse.data;
    console.log("Google user:", user);

    // 사용자 정보를 클라이언트에 반환
    const response = NextResponse.redirect("/dashboard"); // 대시보드로 리다이렉트
    response.cookies.set("user", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1일
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Google login error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
