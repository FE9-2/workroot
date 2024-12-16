import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";
import { cleanedParameters } from "@/utils/cleanedParameters";

// 내가 스크랩한 워크폼 목록 조회 API
export async function GET(request: Request) {
  try {
    // 쿠키에서 액세스 토큰 가져오기
    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // URL 쿼리 파라미터 파싱
    const { searchParams } = new URL(request.url);
    const params: Record<string, string | null> = {
      cursor: searchParams.get("cursor"),
      limit: searchParams.get("limit"),
      orderBy: searchParams.get("orderBy"),
      isPublic: searchParams.get("isPublic"),
      isRecruiting: searchParams.get("isRecruiting"),
    };

    // null, undefined, 빈 문자열을 가진 파라미터 제거
    const cleanedParams = cleanedParameters(params);

    // 스크랩 목록 조회 요청
    const response = await apiClient.get("/users/me/scrap", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: cleanedParams,
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("GET /api/users/me/scrap error:", error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
