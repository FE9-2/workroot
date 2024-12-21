"use client";

import { useRouter } from "next/navigation";
import Button from "@/app/components/button/default/Button";

export default function SignupLayout() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          회원 유형을 선택해주세요
        </h2>
        <div className="mt-10 flex flex-col gap-4">
          <Button onClick={() => router.push("/signup/applicant")} variant="solid">
            지원자로 가입하기
          </Button>
          <Button onClick={() => router.push("/signup/owner")} variant="outlined">
            사장님으로 가입하기
          </Button>
        </div>
      </div>
    </div>
  );
}
