"use client";

import { cn } from "@/lib/tailwindUtil";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FiUser, FiEdit2, FiMapPin } from "react-icons/fi";
import BaseInput from "@/app/components/input/text/BaseInput";
import { useUser } from "@/hooks/queries/user/me/useUser";
import { useUpdateProfile } from "@/hooks/queries/user/me/useUpdateProfile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { nicknameSchema, storePhoneSchema, mobilePhoneSchema } from "@/schemas/commonSchema";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLodingSpinner";

interface EditOwnerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const editOwnerProfileSchema = z.object({
  nickname: nicknameSchema,
  storeName: z.string().min(2, "가게 이름은 2자 이상이어야 합니다").max(20, "가게 이름은 20자 이하여야 합니다"),
  storePhoneNumber: storePhoneSchema,
  phoneNumber: mobilePhoneSchema.optional().or(z.literal("")),
  location: z.string().min(1, "가게 위치를 입력해주세요"),
});

type EditOwnerProfileFormData = z.infer<typeof editOwnerProfileSchema>;

type Field = {
  name: keyof EditOwnerProfileFormData;
  label: string;
  postPosition: string;
  required: boolean;
  hint?: string;
  icon?: React.ReactNode;
};

const EditOwnerProfileModal = ({ isOpen, onClose, className }: EditOwnerProfileModalProps) => {
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
  } = useForm<EditOwnerProfileFormData>({
    resolver: zodResolver(editOwnerProfileSchema),
    mode: "onChange",
    defaultValues: {
      nickname: "",
      storeName: "",
      storePhoneNumber: "",
      phoneNumber: "",
      location: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        nickname: user.nickname || "",
        storeName: user.storeName || "",
        storePhoneNumber: user.storePhoneNumber || "",
        phoneNumber: user.phoneNumber || "",
        location: user.location || "",
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
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const onSubmitHandler = async (data: EditOwnerProfileFormData) => {
    if (isUpdating) return;

    const success = await updateProfile(
      {
        nickname: data.nickname,
        storeName: data.storeName,
        storePhoneNumber: data.storePhoneNumber,
        phoneNumber: data.phoneNumber,
        location: data.location,
      },
      selectedFile
    );

    if (success) {
      onClose();
    }
  };

  const fields: Field[] = [
    { name: "nickname", label: "닉네임", postPosition: "을", required: true },
    {
      name: "storeName",
      label: "가게 이름",
      postPosition: "을",
      required: true,
    },
    { name: "storePhoneNumber", label: "가게 전화번호", postPosition: "를", required: true },
    { name: "phoneNumber", label: "사장님 전화번호", postPosition: "를", required: false },
    {
      name: "location",
      label: "가게 위치",
      postPosition: "를",
      required: true,
      icon: <FiMapPin className="h-5 w-5 text-grayscale-400" />,
    },
  ];

  return (
    <div
      className={cn(
        "relative left-1/2 w-[375px] -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-lg md:w-[480px] lg:w-[540px]",
        className
      )}
    >
      <div className="p-6 pb-0 text-center lg:p-8 lg:pb-0">
        <h2 className="text-[18px] font-semibold lg:text-[24px]">사장님 정보 관리</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col">
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto p-6 lg:p-8">
          <div className="space-y-4 lg:space-y-10">
            <div className="flex justify-center">
              <div className="relative">
                <div className="relative h-[80px] w-[80px] lg:h-[100px] lg:w-[100px]">
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
                      <FiUser className="h-full w-full p-6 text-grayscale-200" />
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
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {fields.map((field) => (
              <div key={field.name} className="h-[62px] space-y-1">
                <label className="text-grayscale-700 block px-2 text-sm font-medium lg:text-base lg:font-semibold">
                  {field.label}
                  {field.required && <span className="text-orange-500">*</span>}
                </label>
                <div className="flex w-full flex-col items-center">
                  <div className="relative w-full">
                    <BaseInput
                      {...register(field.name)}
                      type="text"
                      placeholder={field.hint || `${field.label}${field.postPosition} 입력해주세요.`}
                      variant="white"
                      size="w-full"
                      wrapperClassName={`px-[14px] lg:px-[20px] ${field.icon ? "pl-[40px] lg:pl-[48px]" : ""}`}
                      disabled={isUpdating}
                      errormessage={errors[field.name]?.message}
                    />
                    {field.icon && (
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 lg:left-5">{field.icon}</div>
                    )}
                  </div>
                  {field.hint && (
                    <div className="mt-1 w-full px-2 text-left">
                      <p className="text-sm text-orange-500 lg:text-base">{field.hint}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-grayscale-100 bg-white p-6 lg:p-8">
          <div className="flex h-[36px] justify-between gap-3 lg:h-[48px]">
            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="text-grayscale-700 w-[158px] rounded-md border border-grayscale-300 bg-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-grayscale-50 md:w-[314px] md:text-base"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="w-[158px] rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600 md:w-[314px] md:text-base"
            >
              {isUpdating ? <DotLoadingSpinner /> : "수정하기"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditOwnerProfileModal;
