"use client";

import { useAuth } from "@/hooks/useAuth";
import { type SignupSchema, signupSchema } from "@/schemas/authSchema";
import { userRoles } from "@/constants/userRoles";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Image from "next/image";

export default function ApplicantSignupPage() {
  const { signup, isSignupPending } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: userRoles.APPLICANT,
      phoneNumber: "",
    },
    mode: "all",
  });

  const onSubmit = (data: SignupSchema) => {
    signup(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-lime-200 to-lime-300 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div>
          <h2 className="text-grayscale-900 text-center text-3xl font-bold tracking-tight">지원자 회원가입</h2>
          <p className="text-grayscale-600 mt-2 text-center text-sm">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="font-medium text-lime-600 hover:text-lime-500">
              로그인하기
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-4 rounded-md">
            <input type="hidden" {...register("role")} value={userRoles.APPLICANT} />
            <div>
              <input
                {...register("email")}
                type="email"
                className="text-grayscale-900 relative block w-full rounded-lg border border-grayscale-300 px-3 py-2 placeholder-grayscale-500 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                placeholder="이메일"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <input
                {...register("name")}
                type="text"
                className="text-grayscale-900 relative block w-full rounded-lg border border-grayscale-300 px-3 py-2 placeholder-grayscale-500 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                placeholder="이름"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <input
                {...register("nickname")}
                type="text"
                className="text-grayscale-900 relative block w-full rounded-lg border border-grayscale-300 px-3 py-2 placeholder-grayscale-500 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                placeholder="닉네임"
              />
              {errors.nickname && <p className="mt-1 text-sm text-red-600">{errors.nickname.message}</p>}
            </div>
            <div>
              <input
                {...register("password")}
                type="password"
                className="text-grayscale-900 relative block w-full rounded-lg border border-grayscale-300 px-3 py-2 placeholder-grayscale-500 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                placeholder="비밀번호"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>
            <div>
              <input
                {...register("confirmPassword")}
                type="password"
                className="text-grayscale-900 relative block w-full rounded-lg border border-grayscale-300 px-3 py-2 placeholder-grayscale-500 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                placeholder="비밀번호 확인"
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
            </div>
            <div>
              <input
                {...register("phoneNumber")}
                type="tel"
                className="text-grayscale-900 relative block w-full rounded-lg border border-grayscale-300 px-3 py-2 placeholder-grayscale-500 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                placeholder="전화번호 (예: 010-1234-5678)"
              />
              {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isSignupPending}
              className="group relative flex w-full justify-center rounded-lg bg-lime-600 px-4 py-2 text-sm font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 disabled:bg-lime-300"
            >
              {isSignupPending ? "회원가입 중..." : "회원가입"}
            </button>
          </div>
          <div className="flex justify-center space-x-4">
            <Link
              href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&state=${encodeURIComponent(
                JSON.stringify({ provider: "google", action: "signup", role: "APPLICANT" })
              )}`}
            >
              <Image src="/icons/social/social_google.svg" width={72} height={72} alt="구글 회원가입" />
            </Link>
            <Link
              href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&state=${encodeURIComponent(
                JSON.stringify({ provider: "kakao", action: "signup", role: "APPLICANT" })
              )}`}
            >
              <Image src="/icons/social/social_kakao.svg" width={72} height={72} alt="카카오 회원가입" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
