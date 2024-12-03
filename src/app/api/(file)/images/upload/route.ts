import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import fileApiClient from "@/lib/fileApiClient";

export async function POST(req: NextRequest) {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "파일이 필요합니다." }, { status: 400 });
    }

    // FormData 생성 및 파일 추가
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    const response = await fileApiClient.post("/images/upload", uploadFormData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("response", response);
    console.log("Server response:", {
      status: response.status,
      data: response.data,
      headers: response.headers,
    });

    if (response.status >= 400) {
      return NextResponse.json(
        { message: response.data.message || "Upload failed", details: response.data },
        { status: response.status }
      );
    }

    return NextResponse.json({ url: response.data.url }, { status: 201 });
  } catch (error) {
    console.error("POST /api/images/upload error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
