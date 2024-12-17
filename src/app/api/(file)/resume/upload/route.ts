import apiClient from "@/lib/apiClient";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    console.log("No access token found");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) {
      console.log("No file found in request");
      return NextResponse.json({ error: "파일이 필요합니다." }, { status: 400 });
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

    if (response.data && typeof response.data === "object") {
      const { resumeId, resumeName } = response.data;

      if (resumeId && resumeName) {
        return NextResponse.json({ resumeId, resumeName }, { status: 200 });
      }
    }

    throw new Error("Invalid response format from file API");
  } catch (error: any) {
    console.error("Upload error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    return NextResponse.json(
      {
        message: "Upload failed",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
