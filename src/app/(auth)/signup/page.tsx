"use client";

import { useAuth } from "@/hooks/useAuth";
import { type SignupSchema, signupSchema } from "@/schemas/authSchema";
import { userRoles } from "@/constants/userRoles";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldErrors, useForm } from "react-hook-form";
import { useEffect } from "react";

export default function SignupPage() {
  const { signup, isSignupPending } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: userRoles.APPLICANT,
      phoneNumber: "",
      storeName: "",
      storePhoneNumber: "",
      location: "",
    },
    mode: "all",
  });

  const selectedRole = watch("role");
  const formValues = watch();

  useEffect(() => {
    if (selectedRole === userRoles.APPLICANT) {
      setValue("storeName", "", { shouldValidate: false });
      setValue("storePhoneNumber", "", {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });
      setValue("location", "", { shouldValidate: false });
    } else {
      setValue("phoneNumber", "", { shouldValidate: false });
    }
  }, [selectedRole, setValue]);

  const isFormComplete = () => {
    const baseFields = ["email", "password", "confirmPassword", "name", "nickname"];
    const baseFieldsComplete = baseFields.every((field) => formValues[field as keyof SignupSchema]?.trim() !== "");

    if (selectedRole === userRoles.OWNER) {
      return (
        baseFieldsComplete &&
        formValues.storeName?.trim() !== "" &&
        formValues.storePhoneNumber?.trim() !== "" &&
        formValues.location?.trim() !== ""
      );
    }

    return baseFieldsComplete && formValues.phoneNumber?.trim() !== "";
  };

  const onSubmit = (data: SignupSchema) => {
    signup(data);
  };

  const onError = (errors: FieldErrors<SignupSchema>) => {
    console.error("Form validation errors:", errors);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">회원가입</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              로그인하기
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <input
                {...register("email")}
                type="email"
                className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="이메일"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <input
                {...register("name")}
                type="text"
                className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="이름"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <input
                {...register("nickname")}
                type="text"
                className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="닉네임"
              />
              {errors.nickname && <p className="mt-1 text-sm text-red-600">{errors.nickname.message}</p>}
            </div>
            <div>
              <input
                {...register("password")}
                type="password"
                className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="비밀번호"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>
            <div>
              <input
                {...register("confirmPassword")}
                type="password"
                className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="비밀번호 확인"
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
            </div>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input {...register("role")} type="radio" value={userRoles.APPLICANT} className="mr-2" defaultChecked />
                지원자
              </label>
              <label className="flex items-center">
                <input {...register("role")} type="radio" value={userRoles.OWNER} className="mr-2" />
                사장님
              </label>
            </div>
            {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
            {selectedRole === userRoles.APPLICANT && (
              <div>
                <input
                  {...register("phoneNumber")}
                  type="tel"
                  className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="전화번호 (예: 010-1234-5678)"
                />
                {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>}
              </div>
            )}
            {selectedRole === userRoles.OWNER && (
              <>
                <div>
                  <input
                    {...register("storeName")}
                    type="text"
                    className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="가게 이름"
                  />
                  {errors.storeName && <p className="mt-1 text-sm text-red-600">{errors.storeName.message}</p>}
                </div>
                <div>
                  <input
                    {...register("storePhoneNumber")}
                    type="tel"
                    className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="가게 전화번호 (예: 02-1234-5678)"
                  />
                  {errors.storePhoneNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.storePhoneNumber.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...register("location")}
                    type="text"
                    className="relative block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="가게 위치"
                  />
                  {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
                </div>
              </>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={isSignupPending}
              className={`group relative flex w-full justify-center rounded-lg px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isSignupPending || !isFormComplete()
                  ? "cursor-not-allowed bg-blue-300"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSignupPending ? "회원가입 중..." : "회원가입"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
