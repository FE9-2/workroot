import Image from "next/image";
import { formatRecruitDate } from "@/utils/workDayFormatter";
import { getRecruitmentStatus, getRecruitmentDday } from "@/utils/recruitDateFormatter";
import { BsThreeDotsVertical } from "react-icons/bs";
import Chip from "@/app/components/chip/Chip";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useModalStore from "@/store/modalStore";
import Indicator from "../../pagination/Indicator";
import { FormListType } from "@/types/response/form";
import { useFormScrap } from "@/hooks/queries/form/useFormScap";

/**
 * 알바폼 리스트 아이템 컴포넌트
 * 알바폼 정보를 카드 형태로 표시하며, 이미지 인디케이터와 지원하기/스크랩 기능을 포함
 */
const AlbaListItem = ({
  id,
  imageUrls,
  isPublic,
  recruitmentStartDate,
  recruitmentEndDate,
  title,
  applyCount,
  scrapCount,
}: FormListType) => {
  // 라우터 및 상태 관리
  const router = useRouter();
  const { openModal } = useModalStore();
  const { scrap, isLoading: isScrapLoading } = useFormScrap(id);
  const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 메뉴 표시 상태
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스
  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 메뉴 참조

  // 모집 상태 및 D-day 계산
  const recruitmentStatus = getRecruitmentStatus(recruitmentEndDate);
  const dDay = getRecruitmentDday(recruitmentEndDate);

  // 드롭다운 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  // 지원하기
  const handleFormApplication = () => {
    setShowDropdown(false);
    openModal("customForm", {
      isOpen: true,
      title: "지원하기",
      content: "정말로 지원하시겠습니까?",
      onConfirm: () => {
        router.push(`/apply/${id}`);
      },
      onCancel: () => {},
    });
  };

  // 스크랩
  const handleFormScrap = () => {
    setShowDropdown(false);
    openModal("customForm", {
      isOpen: true,
      title: "스크랩 확인",
      content: "이 공고를 스크랩하시겠습니까?",
      onConfirm: () => {
        scrap();
      },
      onCancel: () => {},
    });
  };

  return (
    <div className="relative h-auto w-full overflow-hidden rounded-xl border border-grayscale-200 bg-white shadow-md transition-transform duration-300 hover:scale-[1.02] sm:h-[390px] sm:w-[327px] md:h-[536px] md:w-[477px]">
      {/* 이미지 슬라이더 영역 */}
      <div className="relative h-[150px] overflow-hidden rounded-t-xl sm:h-[220px] md:h-[310px]">
        {/* 현재 이미지 */}
        {imageUrls[currentImageIndex] && (
          <Image
            src={imageUrls[currentImageIndex]}
            alt={`Recruit Image ${currentImageIndex + 1}`}
            fill
            className="object-cover transition-opacity duration-300"
          />
        )}

        {/* 이미지 인디케이터 */}
        {imageUrls.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <Indicator
              imageCount={imageUrls.length}
              currentPage={currentImageIndex}
              onPageChange={setCurrentImageIndex}
            />
          </div>
        )}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="relative space-y-4 p-4 sm:p-4 md:p-6">
        {/* 상태 표시 영역 (공개여부, 모집상태, 날짜) */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1 text-sm text-grayscale-500 md:text-base">
            <div className="flex items-center gap-2">
              <Chip label={isPublic ? "공개" : "비공개"} variant={isPublic ? "positive" : "negative"} />
              <Chip label={recruitmentStatus} variant={recruitmentStatus === "모집 중" ? "positive" : "negative"} />
              <span className="hidden font-medium text-grayscale-500 md:inline">
                {formatRecruitDate(recruitmentStartDate, true)} ~ {formatRecruitDate(recruitmentEndDate, true)}
              </span>
              <span className="font-medium text-grayscale-500 md:hidden">
                {formatRecruitDate(recruitmentStartDate)} ~ {formatRecruitDate(recruitmentEndDate)}
              </span>
            </div>
          </div>
          {/* 케밥 메뉴 */}
          <div ref={dropdownRef} className="relative">
            <button
              className="hover:text-grayscale-700 text-grayscale-500"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <BsThreeDotsVertical className="h-6 w-6" />
            </button>
            {/* 드롭다운 메뉴 */}
            {showDropdown && (
              <div className="absolute right-0 top-8 z-10 w-32 rounded-lg border border-grayscale-200 bg-white py-2 shadow-lg">
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-primary-orange-100"
                  onClick={handleFormApplication}
                >
                  지원하기
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-primary-orange-100 disabled:opacity-50"
                  onClick={handleFormScrap}
                  disabled={isScrapLoading}
                >
                  {isScrapLoading ? "스크랩 중..." : "스크랩"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 제목 */}
        <h3 className="text-grayscale-900 truncate text-lg font-bold md:text-xl">{title}</h3>

        {/* 통계 정보 (지원자, 스크랩, D-day) */}
        <div className="text-grayscale-700 flex h-[50px] items-center justify-between rounded-2xl border border-grayscale-100 px-4 text-sm md:text-base">
          <div className="flex flex-1 items-center justify-center">
            <span className="font-medium">지원자 {applyCount}명</span>
          </div>
          <div className="h-5 w-[1px] bg-grayscale-200/50" />
          <div className="flex flex-1 items-center justify-center">
            <span className="font-medium">스크랩 {scrapCount}명</span>
          </div>
          <div className="h-5 w-[1px] bg-grayscale-200/50" />
          <div className="flex flex-1 items-center justify-center">
            <span className="font-medium">{dDay}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbaListItem;
