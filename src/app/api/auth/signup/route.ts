import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import apiClient from "@/lib/apiClient";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { email, name, nickname, password, role, storeName, storePhoneNumber, phoneNumber, location } =
      await request.json();
    const response = await apiClient.post("/auth/sign-up", {
      email,
      name,
      nickname,
      password,
      role,
      storeName,
      storePhoneNumber,
      phoneNumber,
      location,
    });
    const { accessToken, refreshToken, user } = response.data;

    return NextResponse.json({ accessToken, refreshToken, user }, { status: 200 });
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
