"use client";

import { useSignup } from "@/hooks/queries/auth/useSignup";
import { type SignupSchema, signupSchema } from "@/schemas/authSchema";
import { userRoles } from "@/constants/userRoles";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Image from "next/image";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import Button from "@/app/components/button/default/Button";
import AuthInput from "@/app/components/input/text/AuthInput";

export default function OwnerSignupPage() {
  const { signup, isPending } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: userRoles.OWNER,
      storeName: "",
      storePhoneNumber: "",
      location: "",
    },
    mode: "all",
  });

  const onSubmit = (data: SignupSchema) => {
    signup(data);
  };

  return (
    <>
      <div>
        <div className="text-grayscale-900 text-center text-3xl font-bold tracking-tight">사장님 회원가입</div>
        <p className="text-grayscale-600 mt-2 text-center text-sm">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="font-medium text-lime-600 hover:text-lime-500">
            로그인하기
          </Link>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-4 rounded-md">
          <input type="hidden" {...register("role")} value={userRoles.OWNER} />
          <div>
            <AuthInput
              {...register("email")}
              type="email"
              name="email"
              placeholder="이메일"
              errormessage={errors.email?.message}
            />
          </div>
          <div>
            <AuthInput
              {...register("name")}
              type="text"
              name="name"
              placeholder="이름"
              errormessage={errors.name?.message}
            />
          </div>
          <div>
            <AuthInput
              {...register("nickname")}
              type="text"
              name="nickname"
              placeholder="닉네임"
              errormessage={errors.nickname?.message}
            />
          </div>
          <div>
            <AuthInput
              {...register("password")}
              type="password"
              name="password"
              placeholder="비밀번호"
              errormessage={errors.password?.message}
            />
          </div>
          <div>
            <AuthInput
              {...register("confirmPassword")}
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              errormessage={errors.confirmPassword?.message}
            />
          </div>
          <div>
            <AuthInput
              {...register("storeName")}
              type="text"
              name="storeName"
              placeholder="가게 이름"
              errormessage={errors.storeName?.message}
            />
          </div>
          <div>
            <AuthInput
              {...register("storePhoneNumber")}
              type="tel"
              name="storePhoneNumber"
              placeholder="가게 전화번호 (예: 02-1234-5678)"
              errormessage={errors.storePhoneNumber?.message}
            />
          </div>
          <div>
            <AuthInput
              {...register("location")}
              type="text"
              name="location"
              placeholder="가게 위치"
              errormessage={errors.location?.message}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button type="submit" variant="solid" color="lime" width="md" disabled={isPending}>
            {isPending ? <DotLoadingSpinner /> : "회원가입"}
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <hr className="flex-grow border-t border-grayscale-200" />
          <span className="mx-4 text-sm text-grayscale-400">SNS 계정으로 회원가입하기</span>
          <hr className="flex-grow border-t border-grayscale-200" />
        </div>
        <div className="flex justify-center space-x-4">
          <Link
            href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&state=${encodeURIComponent(
              JSON.stringify({ provider: "google", action: "signup", role: "OWNER" })
            )}`}
          >
            <Image src="/icons/social/social_google.svg" width={72} height={72} alt="구글 회원가입" />
          </Link>
          <Link
            href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&state=${encodeURIComponent(
              JSON.stringify({ provider: "kakao", action: "signup", role: "OWNER" })
            )}`}
          >
            <Image src="/icons/social/social_kakao.svg" width={72} height={72} alt="카카오 회원가입" />
          </Link>
        </div>
      </form>
    </>
  );
}
