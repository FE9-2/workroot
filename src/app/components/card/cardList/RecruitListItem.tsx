import Image from "next/image";
import { formatRecruitDate } from "@/utils/workDayFormatter";
import { getRecruitmentStatus, getRecruitmentDday } from "@/utils/recruitDateFormatter";
import { BsThreeDotsVertical, BsChevronLeft, BsChevronRight, BsDot } from "react-icons/bs";
import Chip from "@/app/components/chip/Chip";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useModalStore from "@/store/modalStore";

/**
 * 알바 리스트 아이템 컴포넌트 Props
 */
interface RecruitListItemProps {
  id: string; // formId를 id로 변경
  imageUrls: string[]; // 이미지 URL 배열
  isPublic: boolean; // 공개 여부
  recruitmentStartDate: Date; // 모집 시작일
  recruitmentEndDate: Date; // 모집 종료일
  title: string; // 제목
  applyCount: number; // 지원자 수
  scrapCount: number; // 스크랩 수
  location: string; // 위치
}

/**
 * 알바 리스트 아이템 컴포넌트
 * 알바 정보를 카드 형태로 표시하며, 이미지 슬라이더와 수정/삭제 기능을 포함
 */
const RecruitListItem = ({
  id,
  imageUrls,
  isPublic,
  recruitmentStartDate,
  recruitmentEndDate,
  title,
  applyCount,
  scrapCount,
  location,
}: RecruitListItemProps) => {
  // 라우터 및 상태 관리
  const router = useRouter();
  const { openModal } = useModalStore();
  const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 메뉴 표시 상태
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 표시 중인 이미지 인덱스
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

  // 수정 페이지로 이동
  const handleEdit = () => {
    router.push(`/albaList/${id}`);
    setShowDropdown(false);
  };

  // 삭제 모달 표시
  const handleDelete = () => {
    setShowDropdown(false);
    openModal("deleteForm", {
      id,
      isOpen: true,
      title: "삭제 확인",
      message: "정말로 삭제하시겠습니까?",
      onConfirm: () => {
        router.push("/albaList");
        router.refresh();
      },
      onCancel: () => {},
    });
  };

  // 이미지 슬라이더 이전 이미지로 이동
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  // 이미지 슬라이더 다음 이미지로 이동
  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-auto w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-transform duration-300 hover:scale-[1.02] sm:h-[390px] sm:w-[327px] md:h-[536px] md:w-[477px]">
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

        {/* 슬라이더 네비게이션 버튼 */}
        {imageUrls.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="bg-black/30 hover:bg-black/50 absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white transition-opacity md:h-10 md:w-10"
            >
              <BsChevronLeft className="h-3 w-3 md:h-5 md:w-5" />
            </button>
            <button
              onClick={handleNextImage}
              className="bg-black/30 hover:bg-black/50 absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white transition-opacity md:h-10 md:w-10"
            >
              <BsChevronRight className="h-3 w-3 md:h-5 md:w-5" />
            </button>
          </>
        )}

        {/* 이미지 인디케이터 (하단 도트) */}
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
          {imageUrls.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(index);
              }}
              className={`h-2 w-2 rounded-full transition-all ${
                currentImageIndex === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="relative space-y-4 p-4 sm:p-4 md:p-6">
        {/* 상태 표시 영역 (공개여부, 모집상태, 날짜) */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1 text-sm text-gray-500 md:text-base">
            <div className="flex items-center gap-2">
              <Chip label={isPublic ? "공개" : "비공개"} variant={isPublic ? "positive" : "negative"} />
              <Chip label={recruitmentStatus} variant={recruitmentStatus === "모집 중" ? "positive" : "negative"} />
              <span className="hidden font-medium text-gray-500 md:inline">
                {formatRecruitDate(recruitmentStartDate, true)} ~ {formatRecruitDate(recruitmentEndDate, true)}
              </span>
              <span className="font-medium text-gray-500 md:hidden">
                {formatRecruitDate(recruitmentStartDate)} ~ {formatRecruitDate(recruitmentEndDate)}
              </span>
            </div>
          </div>
          {/* 케밥 메뉴 */}
          <div ref={dropdownRef} className="relative">
            <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowDropdown(!showDropdown)}>
              <BsThreeDotsVertical className="h-6 w-6" />
            </button>
            {/* 드롭다운 메뉴 */}
            {showDropdown && (
              <div className="absolute right-0 top-8 z-10 w-32 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-primary-orange-100" onClick={handleEdit}>
                  수정하기
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-primary-orange-100"
                  onClick={handleDelete}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 제목 */}
        <h3 className="truncate text-lg font-bold text-gray-900 md:text-xl">{title}</h3>

        {/* 위치 정보 */}
        <p className="truncate text-sm text-gray-500 md:text-base">{location}</p>

        {/* 통계 정보 (지원자, 스크랩, D-day) */}
        <div className="flex h-[50px] items-center justify-between rounded-2xl border border-gray-100 px-4 text-sm text-gray-700 md:text-base">
          <div className="flex flex-1 items-center justify-center">
            <span className="font-medium">지원자 {applyCount}명</span>
          </div>
          <div className="h-5 w-[1px] bg-gray-200/50" />
          <div className="flex flex-1 items-center justify-center">
            <span className="font-medium">스크랩 {scrapCount}명</span>
          </div>
          <div className="h-5 w-[1px] bg-gray-200/50" />
          <div className="flex flex-1 items-center justify-center">
            <span className="font-medium">{dDay}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitListItem;
