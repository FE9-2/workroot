import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

export async function POST(req: NextRequest) {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    console.log("No access token found");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    try {
      const response = await apiClient.post("/images/upload", formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201 && response.data?.url) {
        return NextResponse.json(response.data, { status: 201 });
      }

      throw new Error("이미지 업로드에 실패했습니다.");
    } catch (error) {
      console.error("Upload failed:", error);
      return NextResponse.json({ message: "이미지 업로드에 실패했습니다." }, { status: 500 });
    }
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ message: "파일 업로드 중 오류가 발생했습니다." }, { status: 500 });
  }
}
