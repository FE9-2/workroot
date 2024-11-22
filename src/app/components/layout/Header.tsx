"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/tailwindUtil";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user, logout, refresh, isLoading } = useAuth();
  const pathname = usePathname();
  const [isFirstRefresh, setIsFirstRefresh] = useState(true);

  // 컴포넌트 마운트 시 한 번만 refresh 시도
  useEffect(() => {
    if (!user && isFirstRefresh) {
      refresh();
      setIsFirstRefresh(false);
    }
  }, [user, refresh, isFirstRefresh]);

  const handleLogout = () => {
    try {
      logout();
      setIsSideMenuOpen(false);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const getLinkClassName = (path: string) => {
    return cn(
      "font-medium transition-colors h-16 flex items-center",
      "hover:text-lime-900",
      pathname === path
        ? "text-lime-900 font-bold text-base sm:text-base md:text-lg"
        : "text-lime-700 text-sm sm:text-base"
    );
  };

  if (isLoading) {
    return (
      <header className="bg-lime-100 shadow-md">
        <div className="container mx-auto px-4">
          <nav className="flex h-16 items-center justify-between">
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

              <div className="ml-4 flex h-16 space-x-3 sm:ml-6 sm:space-x-4 md:ml-10 md:space-x-6">
                <Link href="/albaList" className={getLinkClassName("/albaList")}>
                  알바 목록
                </Link>
                <Link href="/albaTalk" className={getLinkClassName("/albaTalk")}>
                  알바 토크
                </Link>
              </div>
            </div>

            <div className="hidden space-x-4 md:flex">
              <div className="h-8 w-20 animate-pulse rounded-lg bg-lime-200" />
              <div className="h-8 w-20 animate-pulse rounded-lg bg-lime-200" />
            </div>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-lime-100 shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
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

            <div className="ml-4 flex h-16 space-x-3 sm:ml-6 sm:space-x-4 md:ml-10 md:space-x-6">
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

          <ul className="flex items-center space-x-3 sm:space-x-4 md:space-x-6">
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
            ) : null}
          </ul>

          {user && (
            <button onClick={() => setIsSideMenuOpen(true)} className="block" aria-label="메뉴 열기">
              <Image src="/icons/menu/menu-sm.svg" width={24} height={24} alt="메뉴" className="block sm:hidden" />
              <Image src="/icons/menu/menu-md.svg" width={36} height={36} alt="메뉴" className="hidden sm:block" />
            </button>
          )}
        </nav>
      </div>

      {isSideMenuOpen && (
        <div className="bg-black fixed inset-0 z-40 bg-opacity-50" onClick={() => setIsSideMenuOpen(false)} />
      )}

      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out",
          isSideMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col p-6">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-lg font-bold text-lime-700">메뉴</span>
            <button onClick={() => setIsSideMenuOpen(false)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          {user && (
            <>
              <Link
                href="/mypage"
                className="mb-4 rounded-lg bg-lime-50 px-4 py-3 text-lime-700 hover:bg-lime-100"
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
