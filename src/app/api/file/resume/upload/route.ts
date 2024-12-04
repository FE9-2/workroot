import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

export async function POST(req: NextRequest) {
  try {
    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ message: "이력서 파일이 필요합니다." }, { status: 400 });
    }

    // FormData 생성 및 파일 추가
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    const response = await apiClient.post("/resume/upload", uploadFormData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("POST /api/resume/upload error:", error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
