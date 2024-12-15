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

export default function LoginPage() {
  // 로그인 훅과 로딩 상태 관리
  const { login, isPending } = useLogin();

  // 폼 유효성 검사 및 상태 관리
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  // 일반 로그인 제출 핸들러
  const onSubmit = (data: LoginSchema) => {
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-lime-200 to-lime-300 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div>
          <div className="text-grayscale-900 text-center text-3xl font-bold tracking-tight">로그인</div>
          <p className="text-grayscale-600 mt-2 text-center text-sm">
            아직 계정이 없으신가요?{" "}
            <Link href="/signup" className="font-medium text-lime-600 hover:text-lime-500">
              회원가입하기
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md">
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
                {...register("password")}
                type="password"
                className="text-grayscale-900 relative block w-full rounded-lg border border-grayscale-300 px-3 py-2 placeholder-grayscale-500 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                placeholder="비밀번호"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="solid" color="lime" width="md" disabled={isPending}>
              {isPending ? <DotLoadingSpinner /> : "로그인"}
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <hr className="flex-grow border-t border-grayscale-200" />
            <span className="mx-4 text-sm text-grayscale-400">SNS 계정으로 로그인하기</span>
            <hr className="flex-grow border-t border-grayscale-200" />
          </div>
          <div className="flex justify-center space-x-6">
            <Link
              href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&state=${encodeURIComponent(
                JSON.stringify({ provider: "google", action: "login" })
              )}`}
            >
              <Image src="/icons/social/social_google.svg" width={72} height={72} alt="구글 로그인" />
            </Link>
            <Link
              href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&state=${encodeURIComponent(
                JSON.stringify({ provider: "kakao", action: "login" })
              )}`}
            >
              <Image src="/icons/social/social_kakao.svg" width={72} height={72} alt="카카오 로그인" />
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <hr className="flex-grow border-t border-grayscale-200" />
            <span className="mx-4 text-sm text-grayscale-400">테스트 계정으로 로그인하기</span>
            <hr className="flex-grow border-t border-grayscale-200" />
          </div>
          <div className="flex justify-center space-x-6">
            <Button
              variant="outlined"
              width="sm"
              color="lime"
              onClick={() => handleTestLogin(userRoles.APPLICANT)}
              disabled={isPending}
            >
              지원자로 로그인
            </Button>
            <Button
              variant="solid"
              width="sm"
              color="lime"
              onClick={() => handleTestLogin(userRoles.OWNER)}
              disabled={isPending}
            >
              사장님으로 로그인
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
