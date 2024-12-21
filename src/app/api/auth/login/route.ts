import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import apiClient from "@/lib/apiClient";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { email, password } = await request.json();
    const response = await apiClient.post("/auth/sign-in", { email, password });
    const { accessToken, refreshToken, user } = response.data;

    if (accessToken && refreshToken && user) {
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
