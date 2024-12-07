"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/tailwindUtil";
import { useLogout } from "@/hooks/queries/auth/useLogout";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/queries/user/me/useUser";

export default function Header() {
  const { logout } = useLogout();
  const { user, isLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  // 인증이 필요없는 공개 경로들
  const handleLogout = async () => {
    logout();
    toast.success("로그아웃되었습니다!");
    setIsSideMenuOpen(false);
    router.push("/login");
  };

  const getLinkClassName = (path: string) => {
    return cn(
      "font-medium transition-colors h-16 flex items-center",
      "hover:text-lime-900",
      pathname === path
        ? "text-lime-900 text-sm sm:text-base md:text-lg md:font-bold"
        : "text-lime-700 text-sm sm:text-base"
    );
  };

  // 로딩 시간이 1초 이상일 때만 스켈레톤 UI 표시
  if (isLoading) {
    return (
      <header className="fixed left-0 right-0 top-0 z-50 bg-lime-100 -tracking-widest md:tracking-normal">
        <div className="container mx-auto px-4">
          <nav className="flex h-16 items-center justify-between">
            {/* 로고와 메인 네비게이션 */}
            <div className="flex items-center">
              {/* 로고 스켈레톤 */}
              <div className="h-8 w-32 animate-pulse bg-lime-200 sm:w-40 md:w-[200px]" />

              {/* 메뉴 스켈레톤 - 실제 메뉴와 동일한 위치에 배치 */}
              <div className="ml-4 flex h-16 items-center space-x-2 sm:ml-6 sm:space-x-4 md:ml-10 md:space-x-6">
                <div className="h-6 w-16 animate-pulse bg-lime-200" />
                <div className="h-6 w-16 animate-pulse bg-lime-200" />
              </div>
            </div>

            {/* 로그인/회원가입 버튼 스켈레톤 */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="h-8 w-16 animate-pulse bg-lime-200" />
              <div className="h-8 w-16 animate-pulse bg-lime-200" />
            </div>
          </nav>
        </div>
      </header>
    );
  }

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
              <Link href="/albaList" className={getLinkClassName("/albaList")}>
                알바 목록
              </Link>
              <Link href="/albaTalk" className={getLinkClassName("/albaTalk")}>
                알바 토크
              </Link>
              {user && (
                <Link href="/myAlbaform" className={getLinkClassName("/myAlbaform")}>
                  내 알바폼
                </Link>
              )}
            </div>
          </div>

          {/* 로그인/회원가입 또는 메뉴 버튼 */}
          <ul className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
            {!user ? (
              <>
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
              </>
            ) : (
              <button onClick={() => setIsSideMenuOpen(true)} className="block" aria-label="메뉴 열기">
                <Image src="/icons/menu/menu-sm.svg" width={24} height={24} alt="메뉴" className="block sm:hidden" />
                <Image src="/icons/menu/menu-md.svg" width={36} height={36} alt="메뉴" className="hidden sm:block" />
              </button>
            )}
          </ul>
        </nav>
      </div>

      {/* 사이드바 오버레이 */}
      {isSideMenuOpen && (
        <div className="bg-black fixed inset-0 z-40 bg-opacity-50" onClick={() => setIsSideMenuOpen(false)} />
      )}

      {/* 사이드바 */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-40 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:w-64",
          isSideMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex w-full flex-col p-6">
          <div className="mb-6 flex items-center justify-between">
            <span className="px-3 text-lg font-bold text-lime-700">메뉴</span>
            <button onClick={() => setIsSideMenuOpen(false)} className="hover:text-grayscale-700 text-grayscale-500">
              ✕
            </button>
          </div>

          {user && (
            <>
              <Link
                href="/mypage"
                className="mb-4 flex items-center justify-center rounded-lg bg-lime-50 px-4 py-3 text-lime-700 hover:bg-lime-100"
                onClick={() => setIsSideMenuOpen(false)}
              >
                마이페이지
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-lg border-2 border-lime-700 px-4 py-3 text-lime-700 hover:bg-lime-700 hover:text-white"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
