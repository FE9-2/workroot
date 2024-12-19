"use client";

import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { MdStorefront } from "react-icons/md";

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-8 rounded-lg bg-white p-8">
        <div>
          <h2 className="text-grayscale-900 text-center text-3xl font-bold tracking-tight">회원 유형 선택</h2>
          <p className="text-grayscale-600 mt-2 text-center text-sm">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="font-medium text-primary-orange-300 hover:text-primary-orange-200">
              로그인하기
            </Link>
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row">
          {/* 지원자 회원가입 카드 */}
          <Link
            href="/signup/applicant"
            className="flex flex-1 flex-col items-center rounded-lg border-2 border-transparent bg-primary-orange-50 p-8 transition-all hover:scale-105 hover:border-primary-orange-300 hover:shadow-xl"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-orange-50">
              <FaUser className="h-12 w-12 text-primary-orange-300" />
            </div>
            <h3 className="text-grayscale-900 mt-6 text-2xl font-semibold">지원자로 가입</h3>
            <p className="text-grayscale-600 mt-2 text-center">
              알바를 찾고 계신가요?
              <br />
              지원자로 가입하여 알바 정보를 확인하세요.
            </p>
            <div className="mt-6 rounded-lg bg-primary-orange-300 px-6 py-3 text-white transition-colors hover:bg-primary-orange-400">
              지원자로 가입하기
            </div>
          </Link>

          {/* 사장님 회원가입 카드 */}
          <Link
            href="/signup/owner"
            className="flex flex-1 flex-col items-center rounded-lg border-2 border-transparent bg-primary-orange-50 p-8 transition-all hover:scale-105 hover:border-primary-orange-300 hover:shadow-lg"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-orange-50">
              <MdStorefront className="h-14 w-14 text-primary-orange-300" />
            </div>
            <h3 className="text-grayscale-900 mt-6 text-2xl font-semibold">사장님으로 가입</h3>
            <p className="text-grayscale-600 mt-2 text-center">
              직원을 구하고 계신가요?
              <br />
              사장님으로 가입하여 구인 공고를 등록하세요.
            </p>
            <div className="mt-6 rounded-lg bg-primary-orange-300 px-6 py-3 text-white transition-colors hover:bg-primary-orange-400">
              사장님으로 가입하기
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
