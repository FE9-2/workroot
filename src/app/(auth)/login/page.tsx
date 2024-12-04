"use client";
import { useAuth } from "@/hooks/useAuth";
import { type LoginSchema, loginSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const { login, isLoginPending } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    login(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8">
        <div>
          <h2 className="text-grayscale-900 mt-6 text-center text-3xl font-bold tracking-tight">로그인</h2>
          <p className="text-grayscale-600 mt-2 text-center text-sm">
            아직 계정이 없으신가요?
            <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              회원가입하기
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <input
                {...register("email")}
                type="email"
                className="text-grayscale-900 relative block w-full rounded-lg border border-grayscale-300 px-3 py-2 placeholder-grayscale-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="이메일"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <input
                {...register("password")}
                type="password"
                className="text-grayscale-900 relative block w-full rounded-lg border border-grayscale-300 px-3 py-2 placeholder-grayscale-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="비밀번호"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoginPending}
              className="group relative flex w-full justify-center rounded-lg bg-primary-orange-300 px-4 py-2 text-sm font-medium text-white hover:bg-primary-orange-200 focus:outline-none focus:ring-2 focus:ring-primary-orange-300 focus:ring-offset-2 disabled:bg-grayscale-100"
            >
              {isLoginPending ? "로그인 중..." : "로그인"}
            </button>
          </div>
          <div className="flex">
            <button>
              <Image src="/icons/social/social_google.svg" width={72} height={72} alt="구글 로그인" />
            </button>
            <Link
              href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`}
            >
              <Image src="/icons/social/social_kakao.svg" width={72} height={72} alt="카카오 로그인" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
