"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";
import { useOAuth } from "@/hooks/queries/auth/useOAuth";

export default function AuthCallback() {
  const router = useRouter();
  const { handleOAuthCallback, error, setError } = useOAuth();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const access_token = hashParams.get("access_token");

        if (!access_token) {
          setError("No access token found");
          return;
        }

        await handleOAuthCallback(access_token);
      } catch (error) {
        console.error("Callback processing error:", error);
        setError("인증 처리 중 문제가 발생했습니다.");
      }
    };

    processCallback();
  }, []);

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-red-500">Error: {error}</p>
        <button onClick={() => router.push("/login")} className="text-primary-orange-300 hover:underline">
          로그인 페이지로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
