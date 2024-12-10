"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/queries/user/me/useUser";
import { userRoles } from "@/constants/userRoles";

export default function ApplicantPage() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else if (user.role === userRoles.OWNER) {
        router.push("/myAlbaform/owner");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div>로딩 중...</div>
      </div>
    );
  }

  // 지원자용 페이지 컨텐츠
  return (
    <div>
      <h1>지원자 페이지</h1>
      {/* 지원자용 컨텐츠 */}
    </div>
  );
}
