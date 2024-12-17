"use client";
import React, { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { cn } from "@/lib/tailwindUtil";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import useFormDetail from "@/hooks/queries/form/detail/useFormDetail";

interface ScrapBtnProps {
  className?: string;
  formId: number;
}

const ScrapBtn = ({ className = "", formId }: ScrapBtnProps) => {
  const [isScraped, setIsScraped] = useState(false);
  const queryClient = useQueryClient(); // React Query의 QueryClient 인스턴스 사용
  const { albaFormDetailData } = useFormDetail({ formId });

  const toggleScrap = async () => {
    setIsScraped((prev) => !prev);

    try {
      if (!isScraped) {
        // 스크랩
        await axios.post(`/api/forms/${formId}/scrap`, { formId });
        toast.success("스크랩 되었습니다.");
      } else {
        // 스크랩 취소
        await axios.delete(`/api/forms/${formId}/scrap`);
        toast.success("스크랩이 취소되었습니다.");
      }

      // 특정 쿼리 무효화 (키를 기준으로 쿼리를 다시 가져오게 함)
      queryClient.invalidateQueries({ queryKey: ["formDetail", formId] });
    } catch (error) {
      // 오류 발생 시 상태 롤백
      setIsScraped((prev) => !prev);
      toast.error("스크랩 요청에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (albaFormDetailData?.isScrapped !== undefined) {
      setIsScraped(albaFormDetailData.isScrapped);
    }
  }, [albaFormDetailData?.isScrapped]);

  return (
    <button
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-orange-50 p-2 transition-colors",
        className
      )}
      onClick={toggleScrap}
    >
      {isScraped ? (
        <FaBookmark className="text-xl text-primary-orange-300" />
      ) : (
        <FaRegBookmark className="text-xl text-primary-orange-300" />
      )}
    </button>
  );
};

export default ScrapBtn;
