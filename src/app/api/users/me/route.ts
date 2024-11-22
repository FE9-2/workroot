import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

export async function GET() {
  try {
    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await apiClient.get("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = response.data;

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("GET /api/users/me error:", error);
      if (error.response) {
        return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
