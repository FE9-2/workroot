"use client";

import { cn } from "@/lib/tailwindUtil";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FiUser, FiEdit2 } from "react-icons/fi";
import BaseInput from "@/app/components/input/text/BaseInput";
import { useUser } from "@/hooks/useUser";
import axios from "axios";
import toast from "react-hot-toast";

interface EditMyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const EditMyProfileModal = ({ isOpen, onClose, className }: EditMyProfileModalProps) => {
  const { user, refetch } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    phone: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        nickname: user.nickname || "",
        phone: user.phone || "",
      });
      setPreviewUrl(user.imageUrl || "");
    }
  }, [user]);

  if (!isOpen) return null;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    // 미리보기 URL 생성
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrl(previewUrl);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      let imageUrl = user?.imageUrl || "";

      // 새로운 이미지가 선택된 경우에만 업로드
      if (selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", selectedFile);

        const uploadResponse = await axios.post("/api/images/upload", uploadFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        imageUrl = uploadResponse.data.imageUrl;
      }

      // 프로필 정보 업데이트
      await axios.patch("/api/users/me", {
        ...formData,
        imageUrl,
      });

      await refetch();
      toast.success("프로필이 성공적으로 수정되었습니다.");
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "프로필 수정에 실패했습니다.";
        toast.error(errorMessage);
      } else {
        toast.error("프로필 수정 중 오류가 발생했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { name: "name", label: "이름" },
    { name: "nickname", label: "닉네임" },
    { name: "phone", label: "연락처" },
  ];

  return (
    <div className="bg-black/50 fixed inset-0 z-50 p-4 sm:p-6">
      <div className="flex min-h-full items-center justify-center">
        <div
          className={cn(
            "relative h-[610px] w-[375px] overflow-hidden rounded-2xl bg-white p-6 shadow-lg sm:p-8 md:h-[818px] md:w-[720px]",
            className
          )}
        >
          <div className="h-[26px] text-center md:h-[46px]">
            <h2 className="text-[18px] font-semibold md:text-[32px]">내 정보 수정</h2>
          </div>

          <form onSubmit={handleSubmit} className="flex h-[calc(100%-26px)] flex-col md:h-[calc(100%-46px)]">
            <div className="flex-1 space-y-2 md:space-y-8">
              <div className="my-6 flex justify-center md:my-8">
                <div className="relative">
                  <div className="relative h-[110px] w-[110px] md:h-[120px] md:w-[120px]">
                    <button
                      type="button"
                      onClick={handleImageClick}
                      className="h-full w-full overflow-hidden rounded-full bg-gray-100"
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
                        <FiUser className="h-full w-full bg-gray-100 p-6 text-gray-200" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleImageClick}
                      className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-[2px] border-white bg-gray-100 shadow-lg"
                    >
                      <FiEdit2 className="h-4 w-4 text-gray-600" />
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
                <div key={field.name} className="h-[88px] space-y-1.5 md:h-[114px] md:space-y-2">
                  <label className="block px-2 text-sm font-semibold text-gray-700 md:text-base">
                    {field.label}
                    <span className="text-orange-500">*</span>
                  </label>
                  <div className="flex w-full flex-col items-center">
                    <BaseInput
                      type="text"
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={`${field.label}을(를) 입력해주세요.`}
                      variant="white"
                      size="w-[327px] h-[54px] md:w-[640px] md:h-[64px]"
                      wrapperClassName="px-[14px] md:px-[20px]"
                      disabled={isSubmitting}
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
                className="w-[158px] rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 md:w-[314px] md:text-base"
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
      </div>
    </div>
  );
};

export default EditMyProfileModal;
