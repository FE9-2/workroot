"use client";

import { cn } from "@/lib/tailwindUtil";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FiUser, FiEdit2 } from "react-icons/fi";
import BaseInput from "@/app/components/input/text/BaseInput";
import { useUser } from "@/hooks/queries/user/me/useUser";
import { useUpdateProfile } from "@/hooks/queries/user/me/useUpdateProfile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { nicknameSchema, mobilePhoneSchema } from "@/schemas/commonSchema";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import Button from "@/app/components/button/default/Button";

interface EditMyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const editMyProfileSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다").max(10, "이름은 10자 이하여야 합니다"),
  nickname: nicknameSchema,
  phone: mobilePhoneSchema,
});

type EditMyProfileFormData = z.infer<typeof editMyProfileSchema>;

const EditMyProfileModal = ({ isOpen, onClose, className }: EditMyProfileModalProps) => {
  const { user } = useUser();
  const { updateProfile, isUpdating } = useUpdateProfile();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditMyProfileFormData>({
    resolver: zodResolver(editMyProfileSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      nickname: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        nickname: user.nickname || "",
        phone: user.phoneNumber || "",
      });
      setPreviewUrl(user.imageUrl || "");
    }
  }, [user, reset]);

  if (!isOpen) return null;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const onSubmitHandler = async (data: EditMyProfileFormData) => {
    if (isUpdating) return;

    const success = await updateProfile(
      {
        name: data.name,
        nickname: data.nickname,
        phoneNumber: data.phone,
      },
      selectedFile
    );

    if (success) {
      onClose();
    }
  };

  const fields = [
    { name: "name", label: "이름", postPosition: "을" },
    { name: "nickname", label: "닉네임", postPosition: "을" },
    { name: "phone", label: "연락처", postPosition: "를" },
  ] as const;

  return (
    <div
      className={cn(
        "relative left-1/2 w-[375px] -translate-x-1/2 overflow-hidden rounded-2xl bg-white p-6 shadow-lg lg:w-[540px] lg:p-10",
        className
      )}
    >
      <h2 className="h-[26px] text-center text-[18px] font-semibold lg:h-[46px] lg:text-[32px]">내 정보 수정</h2>

      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex h-[calc(100%-26px)] flex-col lg:h-[calc(100%-46px)]"
      >
        <div className="flex-1 space-y-2 lg:space-y-8">
          <div className="relative my-6 flex justify-center lg:my-8">
            <div className="relative h-[110px] w-[110px] lg:h-[120px] lg:w-[120px]">
              <button
                type="button"
                onClick={handleImageClick}
                className="h-full w-full overflow-hidden rounded-full bg-grayscale-100"
              >
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Profile"
                    width={120}
                    height={120}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FiUser className="h-full w-full bg-grayscale-100 p-6 text-grayscale-200" />
                )}
              </button>
              <button
                type="button"
                onClick={handleImageClick}
                className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-[2px] border-white bg-grayscale-100 shadow-lg"
              >
                <FiEdit2 className="text-grayscale-600 h-4 w-4" />
              </button>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </div>

          {fields.map((field) => (
            <div key={field.name} className="space-y-1.5 lg:space-y-2">
              <label className="text-grayscale-700 block px-2 text-sm font-semibold lg:text-base">
                {field.label}
                <span className="text-orange-500">*</span>
              </label>
              <div className="flex w-full flex-col items-center">
                <BaseInput
                  {...register(field.name)}
                  type="text"
                  placeholder={`${field.label}${field.postPosition} 입력해주세요.`}
                  variant="white"
                  size="w-[327px] h-[54px] lg:w-[460px] lg:h-[64px]"
                  wrapperClassName="px-[14px] lg:px-[20px]"
                  disabled={isUpdating}
                  errormessage={errors[field.name]?.message}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex h-[58px] w-full justify-between gap-3 lg:mt-6 lg:h-[72px]">
          <Button
            type="button"
            color="lime"
            variant="outlined"
            onClick={() => {
              onClose();
              reset();
            }}
            disabled={isUpdating}
            className="h-[58px] w-[158px] text-base font-medium lg:h-[72px] lg:w-[314px] lg:text-lg"
          >
            취소
          </Button>
          <Button
            type="submit"
            color="lime"
            variant="solid"
            disabled={isUpdating}
            className="h-[58px] w-[158px] text-base font-medium lg:h-[72px] lg:w-[314px] lg:text-lg"
          >
            {isUpdating ? <DotLoadingSpinner /> : "수정하기"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditMyProfileModal;
