import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";
import { cookies } from "next/headers";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const requestData = await request.json();
    const { email, password, isNewUser, ...userData } = requestData;

    let response;

    if (isNewUser) {
      // 신규 사용자 회원가입
      response = await apiClient.post("/auth/sign-up", {
        email,
        password,
        ...userData,
      });
    } else {
      // 기존 사용자 로그인
      response = await apiClient.post("/auth/sign-in", {
        email,
        password,
      });
    }

    const { accessToken, refreshToken, user } = response.data;

    // 쿠키에 토큰 저장
    cookies().set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 60 * 24, // 1일
      path: "/",
    });

    cookies().set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 14, // 14일
      path: "/",
    });

    return NextResponse.json({ accessToken, refreshToken, user }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("OAuth auth error:", error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "인증 실패" }, { status: 500 });
  }
};
