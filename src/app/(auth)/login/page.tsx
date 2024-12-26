"use client";

import Button from "@/app/components/button/default/Button";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import { useLogin } from "@/hooks/queries/auth/useLogin";
import { type LoginSchema, loginSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { UserRole, userRoles } from "@/constants/userRoles";
import AuthInput from "@/app/components/input/text/AuthInput";
import { signInWithProvider } from "@/lib/supabaseUtils";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { OAuthProvider, oauthProviders } from "@/constants/oauthProviders";

export default function LoginPage() {
  // 로그인 훅과 로딩 상태 관리
  const { login, isPending } = useLogin();
  const [isSocialLogin, setIsSocialLogin] = useState(false);
  const [, setCurrentProvider] = useState<OAuthProvider>(oauthProviders.GOOGLE);

  // 폼 유효성 검사 및 상태 관리
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  // 일반 로그인 제출 핸들러
  const onSubmit = (data: LoginSchema) => {
    setIsSocialLogin(false);
    login(data);
  };

  // 테스트 계정 로그인 핸들러 - 폼 유효성 검사 통과
  const handleTestLogin = (role: UserRole) => {
    const testCredentials = {
      // 지원자 테스트 계정 정보
      [userRoles.APPLICANT]: {
        email: process.env.NEXT_PUBLIC_TEST_APPLICANT_ID as string,
        password: process.env.NEXT_PUBLIC_TEST_APPLICANT_PASSWORD as string,
      },
      // 사장님 테스트 계정 정보
      [userRoles.OWNER]: {
        email: process.env.NEXT_PUBLIC_TEST_OWNER_ID as string,
        password: process.env.NEXT_PUBLIC_TEST_OWNER_PASSWORD as string,
      },
    };

    // setValue를 통해 폼 값을 직접 설정
    const credentials = testCredentials[role];
    setValue("email", credentials.email);
    setValue("password", credentials.password);

    // 설정된 값으로 폼 제출
    handleSubmit((data) => login(data))();
  };

  // 소셜 로그인 핸들러
  const handleSocialLogin = async (provider: OAuthProvider) => {
    try {
      setIsSocialLogin(true);
      setCurrentProvider(provider);
      reset({
        email: "",
        password: "",
      });

      // 소셜 로그인
      await signInWithProvider(provider);
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      toast.error(`${provider} 로그인에 실패했습니다.`);
    }
  };

  return (
    <>
      <div>
        <div className="text-grayscale-900 text-center text-3xl font-bold tracking-tight">로그인</div>
        <p className="text-grayscale-600 mt-2 text-center text-sm">
          아직 계정이 없으신가요?{" "}
          <Link href="/signup" className="font-bold text-primary-orange-300 hover:text-primary-orange-200">
            회원가입하기
          </Link>
        </p>
      </div>

      {/* 일반 로그인 폼 */}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6 rounded-md">
          <div>
            <AuthInput
              {...register("email")}
              type="email"
              name="email"
              placeholder="이메일"
              errormessage={!isSocialLogin ? errors.email?.message : undefined}
            />
          </div>
          <div>
            <AuthInput
              {...register("password")}
              type="password"
              name="password"
              placeholder="비밀번호"
              errormessage={!isSocialLogin ? errors.password?.message : undefined}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button type="submit" variant="solid" width="md" disabled={isPending}>
            {isPending ? <DotLoadingSpinner /> : "로그인"}
          </Button>
        </div>
      </form>

      {/* 소셜 로그인 섹션을 폼 밖으로 이동 */}
      <div className="mt-6 space-y-6">
        <div className="flex items-center justify-center">
          <hr className="flex-grow border-t border-grayscale-200" />
          <span className="mx-4 text-sm text-grayscale-400">SNS 계정으로 로그인하기</span>
          <hr className="flex-grow border-t border-grayscale-200" />
        </div>
        <div className="flex justify-center space-x-6">
          <button
            type="button"
            onClick={() => {
              setIsSocialLogin(true);
              handleSocialLogin(oauthProviders.GOOGLE);
            }}
            className="flex items-center justify-center p-2 transition-transform hover:scale-105 focus:outline-none active:scale-95"
          >
            <div className="relative size-[72px]">
              <Image src="/icons/social/social_google.svg" fill alt="구글 로그인" className="object-contain" priority />
            </div>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSocialLogin(true);
              handleSocialLogin(oauthProviders.KAKAO);
            }}
            className="flex items-center justify-center p-2 transition-transform hover:scale-105 focus:outline-none active:scale-95"
          >
            <div className="relative size-[72px]">
              <Image
                src="/icons/social/social_kakao.svg"
                fill
                alt="카카오 로그인"
                className="object-contain"
                priority
              />
            </div>
          </button>
        </div>
      </div>

      {/* 테스트 계정 섹션도 폼 밖으로 이동 */}
      <div className="mt-6 space-y-6">
        <div className="flex items-center justify-center">
          <hr className="flex-grow border-t border-grayscale-200" />
          <span className="mx-4 text-sm text-grayscale-400">테스트 계정으로 로그인하기</span>
          <hr className="flex-grow border-t border-grayscale-200" />
        </div>
        <div className="flex justify-center space-x-6">
          <Button
            type="button"
            variant="outlined"
            width="sm"
            onClick={() => handleTestLogin(userRoles.APPLICANT)}
            disabled={isPending}
          >
            지원자
          </Button>
          <Button
            type="button"
            variant="solid"
            width="sm"
            onClick={() => handleTestLogin(userRoles.OWNER)}
            disabled={isPending}
          >
            사장님
          </Button>
        </div>
      </div>
    </>
  );
}
