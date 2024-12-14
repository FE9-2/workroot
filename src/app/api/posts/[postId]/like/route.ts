import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

// 게시글 좋아요 API
export async function POST(request: Request, { params }: { params: { postId: string } }) {
  try {
    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const postId = params.postId;

    // body를 빈 객체로 전송
    const response = await apiClient.post(
      `/posts/${postId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(`POST /api/posts/${params.postId}/like error:`, error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// 게시글 좋아요 취소 API
export async function DELETE(request: Request, { params }: { params: { postId: string } }) {
  try {
    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const postId = params.postId;

    const response = await apiClient.delete(`/posts/${postId}/like`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(`DELETE /api/posts/${params.postId}/like error:`, error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
