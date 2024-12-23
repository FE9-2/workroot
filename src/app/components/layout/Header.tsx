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
import Spinner from "../loading-spinner/HamburgerSpinner";
import { HiMiniBars3 } from "react-icons/hi2";

export default function Header() {
  const { logout } = useLogout();
  const { user, isLoading } = useUser();
  const pathname = usePathname();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const router = useRouter();

  // 인증이 필요없는 공개 경로들
  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await logout();
      toast.success("로그아웃되었습니다.");
      setIsSideMenuOpen(false);
      router.push("/login");
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
      isActive
        ? "text-lime-900 text-sm md:text-base lg:text-lg font-bold"
        : "text-primary-orange-400 text-sm md:text-base"
    );
  };
  const headerStyle =
    "fixed left-0 right-0 top-0 z-40 shadow-sm bg-primary-orange-50 -tracking-widest md:tracking-normal";
  const navStyle = "mx-auto flex h-16 min-w-[327px] items-center justify-between px-6 max-w-screen-xl ";
  const menuStyle = "ml-4 flex h-16 items-center gap-4 md:ml-8 md:gap-6 lg:ml-[46px]";
  return (
    <header className={headerStyle}>
      <nav className={navStyle}>
        {/* 로고와 메인 네비게이션 */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-[6px] text-xl">
            <Image
              src="/black_main_logo.png"
              alt="WorkRoot"
              width={96}
              height={54}
              className="h-auto w-24 hover:opacity-90"
            />
          </Link>

          <div className={menuStyle}>
            <Link href="/work-list" className={getLinkClassName("/work-list")}>
              워크 채널
            </Link>
            <Link href="/work-talk" className={getLinkClassName("/work-talk")}>
              워크톡
            </Link>
            {user && (
              <Link href="/my-workform" className={getLinkClassName("/my-workform")}>
                내 워크폼
              </Link>
            )}
          </div>
        </div>

        {/* 로그인/회원가입 또는 메뉴 버튼 */}
        <ul className="relative flex items-center gap-2 lg:gap-4">
          {isLoading ? (
            <>
              <Spinner />
            </>
          ) : !user && !isLoading ? (
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
                    tablet: "md",
                    desktop: "md",
                  }}
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
                    tablet: "md",
                    desktop: "md",
                  }}
                  disabled={false}
                >
                  회원가입
                </LinkBtn>
              </li>
            </>
          ) : (
            <button type="button" onClick={() => setIsSideMenuOpen(true)} className="block p-4" aria-label="메뉴 열기">
              <HiMiniBars3 width={36} height={36} className="size-5 md:size-8" />
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
          "w-30 fixed right-0 top-0 z-40 h-full transform bg-white shadow-md transition-transform duration-300 ease-in-out md:w-44 lg:w-48",
          isSideMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex w-full flex-col p-6">
          <div className="mb-6 flex items-center justify-between" onClick={() => setIsSideMenuOpen(false)}>
            <span className="px-3 text-lg font-bold text-primary-orange-400">메뉴</span>
            <button type="button" className="hover:text-grayscale-700 size-6 text-grayscale-500 lg:size-9">
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
                  tablet: "md",
                  desktop: "lg",
                }}
                fontSize={{
                  mobile: "sm",
                  tablet: "md",
                  desktop: "lg",
                }}
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
                  tablet: "md",
                  desktop: "lg",
                }}
                fontSize={{
                  mobile: "sm",
                  tablet: "md",
                  desktop: "lg",
                }}
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
