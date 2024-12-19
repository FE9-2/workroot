import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

// 워크폼 상세 조회(로그인 여부에 따라 다른 응답)
export async function GET(req: NextRequest, { params }: { params: { formId: string } }) {
  try {
    const accessToken = cookies().get("accessToken")?.value;

    // 로그인한 유저의 경우 토큰과 함께 요청
    if (accessToken) {
      try {
        const response = await apiClient.get(`/forms/${params.formId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return NextResponse.json(response.data);
      } catch (error) {
        // 토큰 만료 에러인 경우 Authorization 없이 재시도
        if (
          error instanceof AxiosError &&
          error.response?.status === 401 &&
          error.response.data.message === "Access token has expired"
        ) {
          const response = await apiClient.get(`/forms/${params.formId}`);
          return NextResponse.json(response.data);
        }
        throw error; // 다른 에러는 상위 catch 블록으로 전달
      }
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(`GET /api/forms/${params.formId} error:`, error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// 워크폼 수정
export async function PATCH(req: NextRequest, { params }: { params: { formId: string } }) {
  try {
    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const response = await apiClient.patch(`/forms/${params.formId}`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(`수정api요청 실패 : /api/forms/${params.formId} error:`, error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// 워크폼 삭제
export async function DELETE(req: NextRequest, { params }: { params: { formId: string } }) {
  try {
    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await apiClient.delete(`/forms/${params.formId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(`DELETE /api/forms/${params.formId} error:`, error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
