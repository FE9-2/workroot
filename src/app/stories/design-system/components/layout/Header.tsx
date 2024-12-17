"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/tailwindUtil";

export default function Header() {
  const getLinkClassName = (path: string) => {
    return cn(
      "font-medium transition-colors h-16 flex items-center",
      "hover:text-lime-900",
      "text-lime-700 text-sm sm:text-base"
    );
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-lime-100 -tracking-widest md:tracking-normal">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* 로고와 메인 네비게이션 */}
          <div className="flex items-center">
            <Link href="/" className="text-xl text-white hover:text-blue-100">
              <Image
                src="/logo.svg"
                alt="Work Root Logo"
                width={200}
                height={60}
                className="w-32 hover:opacity-90 sm:w-40 md:w-[200px]"
              />
            </Link>

            <div className="ml-4 flex h-16 space-x-2 sm:ml-6 sm:space-x-4 md:ml-10 md:space-x-6">
              <Link href="/work-list" className={getLinkClassName("/work-list")}>
                워크 채널
              </Link>
              <Link href="/work-talk" className={getLinkClassName("/work-talk")}>
                워크톡
              </Link>
              <Link href="/my-workform" className={getLinkClassName("/my-workform")}>
                내 워크폼
              </Link>
            </div>
          </div>

          {/* 로그인/회원가입 버튼 */}
          <ul className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
            <li className="flex items-center">
              <Link
                href="/login"
                className="rounded-lg border-2 border-lime-700 px-2 py-1 text-sm text-lime-700 transition-colors hover:bg-lime-700 hover:text-white sm:px-3 sm:py-1.5 sm:text-base md:px-4 md:py-2"
              >
                로그인
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                href="/signup"
                className="rounded-lg bg-lime-700 px-2 py-1 text-sm font-semibold text-white transition-colors hover:bg-lime-800 sm:px-3 sm:py-1.5 sm:text-base md:px-4 md:py-2"
              >
                회원가입
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
