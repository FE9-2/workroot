import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

export async function GET(req: NextRequest, { params }: { params: { resumeId: string } }) {
  try {
    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await apiClient.get(`/${params.resumeId}/download`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: "arraybuffer",
    });

    // Content-Disposition 헤더에서 파일명 추출
    const contentDisposition = response.headers["content-disposition"];
    const filenameMatch = contentDisposition?.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    const filename = filenameMatch ? filenameMatch[1].replace(/['"]/g, "") : "resume.pdf";

    // 파일 다운로드를 위한 응답 헤더 설정
    return new NextResponse(response.data, {
      headers: {
        "Content-Type": response.headers["content-type"] || "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(`GET /api/resume/${params.resumeId}/download error:`, error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
