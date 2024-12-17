import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

// OAuth 로그인 API
export async function POST(request: Request, { params }: { params: { provider: string } }) {
  try {
    console.log("/api/oauth/login");
    const provider = params.provider;

    // provider 유효성 검사
    if (!["google", "kakao"].includes(provider)) {
      return NextResponse.json({ message: "Invalid provider" }, { status: 400 });
    }

    // 요청 본문 파싱
    const body = await request.json();
    console.log("Received body:", body); // 요청 본문 로그 출력
    // OAuth 로그인 요청
    const response = await apiClient.post(`/oauth/sign-in/${provider}`, body);

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(`POST /api/oauth/sign-in/${params.provider} error:`, error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "서버오류" }, { status: 500 });
  }
}
