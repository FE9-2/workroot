import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import apiClient from "@/lib/apiClient";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { refreshToken } = await request.json();
    const response = await apiClient.post("/auth/refresh", { refreshToken });
    const { accessToken } = response.data;

    if (accessToken) {
      cookies().set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 30, // 30분
        path: "/",
      });

      return NextResponse.json({ accessToken }, { status: 200 });
    }

    return NextResponse.json({ message: "로그인 실패" }, { status: 401 });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "로그인 실패" }, { status: 500 });
  }
};
