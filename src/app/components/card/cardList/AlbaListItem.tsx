import Image from "next/image";
import { formatLocalDate } from "@/utils/workDayFormatter";
import { getRecruitmentStatus, getRecruitmentDday } from "@/utils/recruitDateFormatter";
import { BsThreeDotsVertical } from "react-icons/bs";
import Chip from "@/app/components/chip/Chip";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useModalStore from "@/store/modalStore";
import Indicator from "@/app/components/pagination/Indicator";
import { FormListType } from "@/types/response/form";
import { useFormScrap } from "@/hooks/queries/form/useFormScap";
import { MdOutlineImage } from "react-icons/md";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import { isValidS3Url } from "@/utils/checkS3Url";

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
  const [imageError, setImageError] = useState(false);

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

  // 드롭다운 토글 핸들러 수정
  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Link 클릭 방지
    e.stopPropagation(); // 이벤트 전파 방지
    setShowDropdown(!showDropdown);
  };

  // 드롭다운 메뉴 아이템 클릭 핸들러 수정
  const handleFormApplication = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDropdown(false);
    openModal("customForm", {
      isOpen: true,
      title: "지원하기",
      content: "지원하시겠습니까?",
      onConfirm: () => {
        openModal("customForm", {
          isOpen: false,
          title: "",
          content: "",
          onConfirm: () => {},
          onCancel: () => {},
        });
        router.push(`/apply/${id}`);
      },
      onCancel: () => {
        openModal("customForm", {
          isOpen: false,
          title: "",
          content: "",
          onConfirm: () => {},
          onCancel: () => {},
        });
      },
    });
  };

  const handleFormScrap = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDropdown(false);
    openModal("customForm", {
      isOpen: true,
      title: "스크랩 확인",
      content: "스크랩하시겠습니까?",
      onConfirm: () => {
        openModal("customForm", {
          isOpen: false,
          title: "",
          content: "",
          onConfirm: () => {},
          onCancel: () => {},
        });
        scrap();
      },
      onCancel: () => {
        openModal("customForm", {
          isOpen: false,
          title: "",
          content: "",
          onConfirm: () => {},
          onCancel: () => {},
        });
      },
    });
  };

  return (
    <div className="relative h-auto w-[327px] overflow-hidden rounded-xl border border-line-200 bg-white shadow-md transition-transform duration-300 hover:scale-[1.02] lg:w-[372px]">
      {/* 이미지 슬라이더 영역 */}
      <div className="relative h-[200px] overflow-hidden rounded-t-xl lg:h-[240px]">
        {imageUrls[currentImageIndex] && !imageError ? (
          isValidS3Url(imageUrls[currentImageIndex]) ? (
            <Image
              src={imageUrls[currentImageIndex]}
              alt={`Recruit Image ${currentImageIndex + 1}`}
              fill
              className="object-cover transition-opacity duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-grayscale-100">
              <MdOutlineImage className="size-20 text-grayscale-400" />
            </div>
          )
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-grayscale-100">
            <MdOutlineImage className="size-20 text-grayscale-400" />
          </div>
        )}

        {/* 이미지 인디케이터 - 유효한 이미지가 2개 이상이고 에러가 없을 때만 표시 */}
        {imageUrls.filter((url) => isValidS3Url(url)).length > 1 && !imageError && (
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
      <div className="relative flex h-[140px] flex-col justify-between p-2 lg:h-[160px]">
        {/* 상단 영역 */}
        <div className="flex flex-col gap-4">
          {/* 상태 표시 영역 (공개여부, 모집상태, 날짜) */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1 text-grayscale-500">
              <div className="flex items-center justify-between">
                <Chip label={isPublic ? "공개" : "비공개"} variant={isPublic ? "positive" : "negative"} />
                <Chip label={recruitmentStatus} variant={recruitmentStatus === "모집 중" ? "positive" : "negative"} />
                <span className="ml-4 text-xs font-medium tracking-tighter text-grayscale-500 md:inline lg:text-sm">
                  {formatLocalDate(recruitmentStartDate, true)} ~ {formatLocalDate(recruitmentEndDate, true)}
                </span>
              </div>
            </div>
            {/* 케밥 메뉴 */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                className="hover:text-grayscale-700 text-grayscale-500"
                onClick={handleDropdownToggle}
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
                    {isScrapLoading ? <DotLoadingSpinner /> : "스크랩"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 제목 */}
          <div className="text-grayscale-900 truncate pl-2 text-base font-bold lg:text-lg">{title}</div>
        </div>

        {/* 통계 정보 영역 - mt-auto 제거하고 부모 컨테이너에 justify-between 추가 */}
        <div className="text-grayscale-700 mt-4 flex h-[50px] items-center justify-between rounded-2xl border border-grayscale-100 text-sm lg:text-base">
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
