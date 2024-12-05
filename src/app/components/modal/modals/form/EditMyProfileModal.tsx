"use client";

import { cn } from "@/lib/tailwindUtil";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FiUser, FiEdit2 } from "react-icons/fi";
import BaseInput from "@/app/components/input/text/BaseInput";
import { useUser } from "@/hooks/useUser";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { nicknameSchema, mobilePhoneSchema } from "@/schemas/commonSchema";

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
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      let imageUrl = user?.imageUrl || "";

      if (selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("image", selectedFile);

        const uploadResponse = await axios.post("/api/images/upload", uploadFormData, {
          withCredentials: true,
        });

        if (uploadResponse.status === 201 && uploadResponse.data?.url) {
          imageUrl = uploadResponse.data.url;
        } else {
          throw new Error("이미지 업로드에 실패했습니다.");
        }
      }

      const updateData = {
        name: data.name,
        nickname: data.nickname,
        phoneNumber: data.phone,
        imageUrl,
      };

      const updateResponse = await axios.patch("/api/users/me", updateData);

      if (updateResponse.status === 200) {
        localStorage.setItem("user", JSON.stringify(updateResponse.data));
        await refetch(); // React Query 캐시 갱신
        toast.success("프로필이 성공적으로 수정되었습니다.");
        onClose();
      } else {
        throw new Error("프로필 업데이트에 실패했습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "프로필 수정에 실패했습니다.";
        console.error("Profile update error:", {
          status: error.response?.status,
          data: error.response?.data,
        });
        toast.error(errorMessage);
      } else {
        console.error("Unexpected error:", error);
        toast.error("프로필 수정 중 오류가 발생했습니다.");
      }
    } finally {
      setIsSubmitting(false);
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
        "relative left-1/2 h-[610px] w-[375px] -translate-x-1/2 overflow-hidden rounded-2xl bg-white p-6 shadow-lg sm:p-8 md:h-[818px] md:w-[720px]",
        className
      )}
    >
      <div className="h-[26px] text-center md:h-[46px]">
        <h2 className="text-[18px] font-semibold md:text-[32px]">내 정보 수정</h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex h-[calc(100%-26px)] flex-col md:h-[calc(100%-46px)]"
      >
        <div className="flex-1 space-y-2 md:space-y-8">
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
          </div>

          {fields.map((field) => (
            <div key={field.name} className="h-[88px] space-y-1.5 md:h-[114px] md:space-y-2">
              <label className="text-grayscale-700 block px-2 text-sm font-semibold md:text-base">
                {field.label}
                <span className="text-orange-500">*</span>
              </label>
              <div className="flex w-full flex-col items-center">
                <BaseInput
                  {...register(field.name)}
                  type="text"
                  placeholder={`${field.label}${field.postPosition} 입력해주세요.`}
                  variant="white"
                  size="w-[327px] h-[54px] md:w-[640px] md:h-[64px]"
                  wrapperClassName="px-[14px] md:px-[20px]"
                  disabled={isSubmitting}
                  errormessage={errors[field.name]?.message}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex h-[58px] justify-between gap-3 md:h-[72px]">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-grayscale-700 w-[158px] rounded-md border border-grayscale-300 bg-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-grayscale-100 md:w-[314px] md:text-base"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[158px] rounded-md bg-primary-orange-300 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-orange-200 md:w-[314px] md:text-base"
          >
            {isSubmitting ? "수정 중..." : "수정하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMyProfileModal;
