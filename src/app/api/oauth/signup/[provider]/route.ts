import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

// OAuth 회원가입 API
export async function POST(request: Request, { params }: { params: { provider: string } }) {
  try {
    const provider = params.provider;

    // provider 유효성 검사
    if (!["google", "kakao"].includes(provider)) {
      return NextResponse.json({ message: "Invalid provider" }, { status: 400 });
    }

    // 요청 본문 파싱
    const body = await request.json();

    // OAuth 회원가입 요청
    const response = await apiClient.post(`/oauth/sign-up/${provider}`, body);

    // 응답에서 토큰 추출
    const { accessToken, refreshToken } = response.data;

    // 쿠키에 토큰 저장
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

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(`POST /api/oauth/sign-up/${params.provider} error:`, error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
