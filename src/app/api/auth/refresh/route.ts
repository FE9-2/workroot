import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

export const POST = async (): Promise<NextResponse> => {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken");

  if (!refreshToken) {
    return new NextResponse(
      JSON.stringify({
        message: "리프레시 토큰이 없습니다. 다시 로그인해주세요.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // 토큰 갱신
    const refreshResponse = await apiClient.post("/auth/refresh", {
      refreshToken: refreshToken.value,
    });
    const { accessToken } = refreshResponse.data;

    if (!accessToken) {
      return NextResponse.json({ message: "토큰 갱신 실패" }, { status: 401 });
    }

    // 새로운 accessToken 쿠키 설정
    cookies().set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 30, // 30분
      path: "/",
    });

    return NextResponse.json(refreshResponse.data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Refresh token error:", error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "토큰 갱신 실패" }, { status: 500 });
  }
};
