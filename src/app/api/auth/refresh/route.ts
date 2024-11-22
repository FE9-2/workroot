import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

export const POST = async (): Promise<NextResponse> => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;
    // 토큰 갱신
    const refreshResponse = await apiClient.post("/auth/refresh", { refreshToken });
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

    // 새로운 accessToken으로 사용자 정보 조회
    const userResponse = await apiClient.get("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = userResponse.data;

    if (!user) {
      return NextResponse.json({ message: "사용자 정보를 찾을 수 없습니다." }, { status: 404 });
    }

    // user 정보 반환
    return NextResponse.json({ user }, { status: 200 });
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
