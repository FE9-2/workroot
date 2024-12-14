import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

// 지원서 상세 조회
export async function GET(req: NextRequest, { params }: { params: { applicationId: string } }) {
  try {
    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await apiClient.get(`/applications/${params.applicationId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(`GET /api/applications/${params.applicationId} error:`, error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// 지원서 상태 수정
export async function PATCH(req: NextRequest, { params }: { params: { applicationId: string } }) {
  try {
    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const response = await apiClient.patch(`/applications/${params.applicationId}`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(`PATCH /api/applications/${params.applicationId} error:`, error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
