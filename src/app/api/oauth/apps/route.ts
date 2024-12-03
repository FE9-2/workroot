import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import apiClient from "@/lib/apiClient";
import { cookies } from "next/headers";

// OAuth 앱 등록/수정 API
export async function POST(request: NextRequest) {
  try {
    // 쿠키에서 액세스 토큰 가져오기
    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 요청 본문 파싱
    const body = await request.json();

    // OAuth 앱 등록/수정 요청
    const response = await apiClient.post("/oauth/apps", body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 응답 데이터 처리
    const responseData = response.data;
    console.log("OAuth 앱 등록/수정 성공:", responseData);

    return NextResponse.json(responseData);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("POST /api/oauth/apps error:", error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
