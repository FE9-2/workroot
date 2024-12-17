"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/tailwindUtil";
import { useLogout } from "@/hooks/queries/auth/useLogout";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/queries/user/me/useUser";
import LinkBtn from "../button/default/LinkBtn";
import { useRouter } from "next/navigation";

export default function Header() {
  const { logout } = useLogout();
  const { user, isLoading } = useUser();
  const pathname = usePathname();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const router = useRouter();

  // 인증이 필요없는 공개 경로들
  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      logout();
      toast.success("로그아웃되었습니다!");
      setIsSideMenuOpen(false);
      setTimeout(() => {
        router.push("/login");
      }, 100);
    } catch (error) {
      console.error("로그아웃 실패:", error);
      toast.error("로그아웃에 실패했습니다.");
    }
  };

  const getLinkClassName = (path: string) => {
    const isActive = pathname === path || pathname.startsWith(`${path}/`);

    return cn(
      "font-medium transition-colors h-16 flex items-center",
      "hover:text-lime-900 hover:font-bold hover:opacity-70",
      isActive ? "text-lime-900 text-sm md:text-base lg:text-lg font-bold" : "text-lime-700 text-sm md:text-base"
    );
  };
  const headerStyle = "fixed left-0 right-0 top-0 z-40 shadow-sm bg-lime-100 -tracking-widest md:tracking-normal";
  const navStyle = "mx-auto flex h-16 min-w-[327px] items-center justify-between px-6 max-w-screen-xl ";
  const menuStyle = "ml-4 flex h-16 items-center gap-4 md:ml-8 md:gap-6 lg:ml-[46px]";
  const skeletonStyle = "w-16 animate-pulse bg-lime-200";
  // 로딩 시간이 1초 이상일 때만 스켈레톤 UI 표시
  if (isLoading) {
    return (
      <header className={headerStyle}>
        <nav className={navStyle}>
          {/* 로고와 메인 네비게이션 */}
          <div className="flex items-center">
            {/* 로고 스켈레톤 - 이미지로 대체*/}
            <div className="flex gap-[6px]">
              <Image src="/logo.png" alt="Work Root" width={52} height={40} className="w-14" />
              <div className="hidden items-center text-3xl font-semibold text-lime-600 md:flex">WorkRoot</div>
            </div>
            {/* 메뉴 스켈레톤 - 실제 메뉴와 동일한 위치에 배치 */}
            <div className={menuStyle}>
              <div className={cn("h-6", skeletonStyle)} />
              <div className={cn("h-6", skeletonStyle)} />
            </div>
          </div>

          {/* 로그인/회원가입 버튼 스켈레톤 */}
          <div className="flex items-center gap-2 lg:gap-4">
            <div className={cn("h-8", skeletonStyle)} />
            <div className={cn("h-8", skeletonStyle)} />
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className={headerStyle}>
      <nav className={navStyle}>
        {/* 로고와 메인 네비게이션 */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-[6px] text-xl">
            <Image src="/logo.png" alt="Work Root" width={52} height={40} className="w-14 hover:opacity-90" />
            <div className="hidden items-center text-3xl font-semibold text-lime-600 md:flex">WorkRoot</div>
          </Link>

          <div className={menuStyle}>
            <Link href="/alba-list" className={getLinkClassName("/alba-list")}>
              워크 채널
            </Link>
            <Link href="/alba-talk" className={getLinkClassName("/alba-talk")}>
              워크톡
            </Link>
            {user && (
              <Link href="/my-albaform" className={getLinkClassName("/my-albaform")}>
                내 워크폼
              </Link>
            )}
          </div>
        </div>

        {/* 로그인/회원가입 또는 메뉴 버튼 */}
        <ul className="flex items-center gap-2 lg:gap-4">
          {!user ? (
            <>
              <li className="flex items-center">
                <LinkBtn
                  href="/login"
                  variant="outlined"
                  width={{
                    mobile: "xs",
                    tablet: "sm",
                    desktop: "sm",
                  }}
                  height="sm"
                  fontSize={{
                    mobile: "sm",
                    tablet: "base",
                    desktop: "base",
                  }}
                  color="lime"
                  disabled={false}
                >
                  로그인
                </LinkBtn>
              </li>
              <li className="flex items-center">
                <LinkBtn
                  href="/signup"
                  variant="solid"
                  width={{
                    mobile: "xs",
                    tablet: "sm",
                    desktop: "sm",
                  }}
                  height="sm"
                  fontSize={{
                    mobile: "sm",
                    tablet: "base",
                    desktop: "base",
                  }}
                  color="lime"
                  disabled={false}
                >
                  회원가입
                </LinkBtn>
              </li>
            </>
          ) : (
            <button type="button" onClick={() => setIsSideMenuOpen(true)} className="block" aria-label="메뉴 열기">
              <Image src="/icons/menu/menu-sm.svg" width={24} height={24} alt="메뉴" className="block sm:hidden" />
              <Image src="/icons/menu/menu-md.svg" width={36} height={36} alt="메뉴" className="hidden sm:block" />
            </button>
          )}
        </ul>
      </nav>

      {/* 사이드바 오버레이 */}
      {isSideMenuOpen && (
        <div className="bg-black fixed inset-0 z-30 bg-opacity-50" onClick={() => setIsSideMenuOpen(false)} />
      )}

      {/* 사이드바 */}
      <div
        className={cn(
          "fixed right-0 top-0 z-40 h-full w-40 transform bg-white shadow-md transition-transform duration-300 ease-in-out md:w-72",
          isSideMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex w-full flex-col p-6">
          <div className="mb-6 flex items-center justify-between">
            <span className="px-3 text-lg font-bold text-lime-700">메뉴</span>
            <button
              type="button"
              onClick={() => setIsSideMenuOpen(false)}
              className="hover:text-grayscale-700 text-grayscale-500"
            >
              ✕
            </button>
          </div>

          {user && (
            <div className="flex flex-col gap-2 md:gap-4">
              <LinkBtn
                href="/mypage"
                variant="outlined"
                width={{
                  mobile: "sm",
                  tablet: "sm",
                  desktop: "md",
                }}
                color="lime"
                disabled={false}
                onClick={() => setIsSideMenuOpen(false)}
              >
                마이페이지
              </LinkBtn>
              <LinkBtn
                href="/login"
                variant="solid"
                width={{
                  mobile: "sm",
                  tablet: "sm",
                  desktop: "md",
                }}
                color="lime"
                disabled={false}
                onClick={handleLogout}
              >
                로그아웃
              </LinkBtn>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
