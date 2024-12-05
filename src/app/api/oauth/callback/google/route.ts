import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { decodeJwt } from "@/middleware";
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const role = searchParams.get("state");
  console.log("state", role);
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

    const { access_token, id_token } = tokenResponse.data;
    console.log("Google access token:", access_token);
    console.log("Google id token:", id_token);

    // id_token 디코딩
    const decodedIdToken = decodeJwt(id_token);
    if (!decodedIdToken) {
      return NextResponse.json({ message: "Invalid ID token" }, { status: 400 });
    }

    const user = {
      id: decodedIdToken.sub,
      name: decodedIdToken.name,
      role: role,
      picture: decodedIdToken.picture,
      email: decodedIdToken.email,
    };
    console.log("Google user:", user);
    // 여기서 role이 "role":"\bowner"로 나옴

    // 사용자 정보를 클라이언트에 반환
    const response = NextResponse.redirect("http://localhost:3000");
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
