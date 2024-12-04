"use client";

import { cn } from "@/lib/tailwindUtil";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FiUser, FiEdit2, FiMapPin } from "react-icons/fi";
import BaseInput from "@/app/components/input/text/BaseInput";
import { useUser } from "@/hooks/useUser";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { nicknameSchema, storePhoneSchema, mobilePhoneSchema } from "@/schemas/commonSchema";

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
  const { user, refetch } = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      let imageUrl = user?.imageUrl || "";

      if (selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("image", selectedFile);

        const uploadResponse = await axios.post("/api/file/images/upload", uploadFormData, {
          withCredentials: true,
        });

        if (uploadResponse.status === 201 && uploadResponse.data?.url) {
          imageUrl = uploadResponse.data.url;
        } else {
          throw new Error("이미지 업로드에 실패했습니다.");
        }
      }

      const updateData = {
        ...data,
        imageUrl,
      };

      const updateResponse = await axios.patch("/api/users/me", updateData);

      if (updateResponse.status === 200) {
        localStorage.setItem("user", JSON.stringify(updateResponse.data));
        await refetch(); // React Query 캐시 갱신
        toast.success("사장님 정보가 성공적으로 수정되었습니다.");
        onClose();
      } else {
        throw new Error("프로필 업데이트에 실패했습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "정보 수정에 실패했습니다.";
        console.error("Profile update error:", {
          status: error.response?.status,
          data: error.response?.data,
        });
        toast.error(errorMessage);
      } else {
        console.error("Unexpected error:", error);
        toast.error("정보 수정 중 오류가 발생했습니다.");
      }
    } finally {
      setIsSubmitting(false);
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
        "relative left-1/2 h-[842px] w-[375px] -translate-x-1/2 overflow-hidden rounded-2xl bg-white p-6 shadow-lg sm:p-8 md:h-[1138px] md:w-[720px]",
        className
      )}
    >
      <div className="h-[26px] text-center md:h-[46px]">
        <h2 className="text-[18px] font-semibold md:text-[32px]">사장님 정보 관리</h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex h-[calc(100%-26px)] flex-col md:h-[calc(100%-46px)]"
      >
        <div className="flex-1 space-y-4 md:space-y-10">
          <div className="my-6 flex justify-center md:my-8">
            <div className="relative">
              <div className="relative h-[110px] w-[110px] md:h-[120px] md:w-[120px]">
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
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
          </div>

          {fields.map((field) => (
            <div key={field.name} className="h-[88px] space-y-1.5 md:h-[114px] md:space-y-2">
              <label className="text-grayscale-700 block px-2 text-sm font-medium md:text-base md:font-semibold">
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
                    size="h-[54px] w-[327px] md:h-[64px] md:w-[640px]"
                    wrapperClassName={`px-[14px] md:px-[20px] ${field.icon ? "pl-[40px] md:pl-[48px]" : ""}`}
                    disabled={isSubmitting}
                    errormessage={errors[field.name]?.message}
                  />
                  {field.icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 md:left-5">{field.icon}</div>}
                </div>
                {field.hint && (
                  <div className="mt-1 w-full px-2 text-left">
                    <p className="text-sm text-orange-500 md:text-base">{field.hint}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex h-[58px] justify-between gap-3 md:h-[72px]">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-grayscale-700 w-[158px] rounded-md border border-grayscale-300 bg-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-grayscale-50 md:w-[314px] md:text-base"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[158px] rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600 md:w-[314px] md:text-base"
          >
            {isSubmitting ? "수정 중..." : "수정하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOwnerProfileModal;
