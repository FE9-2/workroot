import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";
import { cleanedParameters } from "@/utils/cleanedParameters";

// 알바폼 생성
export async function POST(req: NextRequest) {
  try {
    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const response = await apiClient.post("/forms", body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("POST /api/forms error:", error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// 알바폼 목록 조회
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const params = {
      cursor: searchParams.get("cursor"),
      limit: searchParams.get("limit"),
      orderBy: searchParams.get("orderBy"),
      keyword: searchParams.get("keyword"),
      isRecruiting: searchParams.get("isRecruiting"),
    };

    // null, undefined, 빈 문자열을 가진 파라미터 제거
    const cleanedParams = cleanedParameters(params);

    const response = await apiClient.get("/forms", {
      params: cleanedParams,
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("GET /api/forms error:", error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
