import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

// 내 정보 조회 API
export async function GET() {
  try {
    // 쿠키에서 액세스 토큰 가져오기
    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 내 정보 조회 요청
    const response = await apiClient.get("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("GET /api/users/me error:", error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// 내 정보 수정 API
export async function PATCH(request: Request) {
  try {
    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    console.log("PATCH /users/me request body:", body);

    const response = await apiClient.patch("/users/me", body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("PATCH /users/me response:", {
      status: response.status,
      data: response.data,
    });

    if (response.status === 200 && response.data) {
      return NextResponse.json(response.data);
    }

    throw new Error("Failed to update user profile");
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("PATCH /api/users/me error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      if (error.response) {
        return NextResponse.json(
          {
            message: error.response.data.message,
            details: error.response.data.details,
          },
          { status: error.response.status }
        );
      }
    }
    console.error("Unexpected error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
