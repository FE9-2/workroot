import { NextResponse } from "next/server";

export const POST = async () => {
  const response = NextResponse.json({ success: true });

  // accessToken 쿠키 삭제
  response.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0, // 즉시 만료
    path: "/",
  });

  // refreshToken 쿠키 삭제
  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  return response;
};
