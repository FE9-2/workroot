import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import apiClient from "@/lib/apiClient";
import { userRoles } from "@/constants/userRoles";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const requestData = await request.json();
    const { role } = requestData;

    let data;
    if (role === userRoles.APPLICANT) {
      // 지원자의 경우 필요한 필드만 추출
      const { email, password, name, nickname, phoneNumber, role } = requestData;

      data = {
        email,
        password,
        name,
        nickname,
        phoneNumber,
        role,
      };
    } else {
      // 사장님의 경우 필요한 필드만 추출
      const { email, password, name, nickname, storeName, storePhoneNumber, location, role } = requestData;

      data = {
        email,
        password,
        name,
        nickname,
        storeName,
        storePhoneNumber,
        location,
        role,
      };
    }

    const response = await apiClient.post("/auth/sign-up", data);
    const { accessToken, refreshToken, user } = response.data;

    return NextResponse.json({ accessToken, refreshToken, user }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "회원가입 실패" }, { status: 500 });
  }
};
