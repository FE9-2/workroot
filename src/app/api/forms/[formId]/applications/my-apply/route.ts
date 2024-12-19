import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

// 회원의 내 지원 내역 조회
export async function GET(req: NextRequest, { params }: { params: { formId: string } }) {
  console.log("API Route hit - 내 지원내역 조회:", params.formId);

  try {
    const accessToken = cookies().get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const apiUrl = `/forms/${params.formId}/my-application`;

    const response = await apiClient.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("API 에러 응답:", error.response?.data);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
