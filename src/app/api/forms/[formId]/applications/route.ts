import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

// 지원하기
export async function POST(req: NextRequest, { params }: { params: { formId: string } }) {
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const body = await req.json();
    console.log("apply 라우트에서 body출력", body);

    // 토큰 없어도 비회원 apply 가능
    if (!accessToken) {
      const response = await apiClient.post(`/forms/${params.formId}/applications`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return NextResponse.json(response.data);
    } else {
      const response = await apiClient.post(`/forms/${params.formId}/applications`, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      return NextResponse.json(response.data);
    }
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof AxiosError) {
      console.error(`POST /api/forms/${params.formId}/applications error:`, error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// 지원 현황 목록 조회
export async function GET(req: NextRequest, { params }: { params: { formId: string } }) {
  try {
    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const queryParams = {
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      status: searchParams.get("status"),
      sort: searchParams.get("sort"),
    };

    const response = await apiClient.get(`/forms/${params.formId}/applications`, {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(`GET /api/forms/${params.formId}/applications error:`, error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
