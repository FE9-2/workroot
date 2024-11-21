"use client";

import { useUserStore } from "@/store/userStore";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl text-white hover:text-blue-100">
            WorkRoot
          </Link>

          <ul className="flex items-center space-x-6">
            {!user ? (
              // 비로그인 상태 메뉴
              <>
                <li>
                  <Link href="/login" className="rounded-lg px-4 py-2 text-white transition-colors hover:bg-white/10">
                    로그인
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="rounded-lg bg-white px-4 py-2 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                  >
                    회원가입
                  </Link>
                </li>
              </>
            ) : (
              // 로그인 상태 메뉴
              <>
                <li>
                  <span className="text-white">안녕하세요, {user.nickname}님</span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="rounded-lg border-2 border-white px-4 py-2 text-white transition-colors hover:bg-white/10"
                  >
                    로그아웃
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
