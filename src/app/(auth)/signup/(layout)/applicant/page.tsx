"use client";

import { useSignup } from "@/hooks/queries/auth/useSignup";
import { type SignupSchema, signupSchema } from "@/schemas/authSchema";
import { userRoles } from "@/constants/userRoles";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import Button from "@/app/components/button/default/Button";
import AuthInput from "@/app/components/input/text/AuthInput";

export default function ApplicantSignupPage() {
  const { signup, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: userRoles.APPLICANT,
      phoneNumber: "",
      email: "",
      nickname: "",
    },
    mode: "all",
  });

  const onSubmit = (data: SignupSchema) => {
    // 지원자 회원가입
    signup(data);
  };

  return (
    <>
      <div>
        <div className="text-grayscale-900 text-center text-3xl font-bold tracking-tight">지원자 회원가입</div>
        <p className="text-grayscale-600 mt-2 text-center text-sm">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="font-medium text-primary-orange-300 hover:text-primary-orange-200">
            로그인하기
          </Link>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-4 rounded-md">
          <input type="hidden" {...register("role")} value={userRoles.APPLICANT} />
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
              {...register("phoneNumber")}
              type="tel"
              name="phoneNumber"
              placeholder="전화번호 (예: 010-1234-5678)"
              errormessage={errors.phoneNumber?.message}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button type="submit" variant="solid" color="lime" width="md" disabled={isPending}>
            {isPending ? <DotLoadingSpinner /> : "회원가입"}
          </Button>
        </div>
      </form>
    </>
  );
}
