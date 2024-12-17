import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

// 비회원의 내 지원 내역 조회
export async function POST(req: NextRequest, { params }: { params: { formId: string } }) {
  try {
    const body = await req.json();
    const { name, phone, password } = body;

    if (!name || !phone || !password) {
      return NextResponse.json({ message: "이름, 전화번호, 비밀번호가 필요합니다." }, { status: 400 });
    }

    const response = await apiClient.post(`/forms/${params.formId}/my-application/verify`, {
      name,
      phone,
      password,
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(`POST /api/forms/${params.formId}/applications/myApplication/verify error:`, error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
