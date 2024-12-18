import { getRecruitmentStatus } from "@/utils/recruitDateFormatter";
import { formatLocalDate } from "@/utils/workDayFormatter";
import Chip from "@/app/components/chip/Chip";
import Image from "next/image";
import { MyApplicationType } from "@/types/response/user";
import { MdOutlineImage } from "react-icons/md";
import translateStatus, { getStatusVariant } from "@/utils/translateStatus";
import { ApplicationStatusType } from "@/types/applicationStatus";
import { useResumeDownLoad } from "@/hooks/useResumeDownLoad";

const MyApplicationListItem = ({ createdAt, status, resumeId, resumeName, form }: MyApplicationType) => {
  const { downloadResume } = useResumeDownLoad();

  // 이력서 다운로드 핸들러
  const handleResumeDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모의 Link 이벤트 전파 방지
    e.preventDefault(); // 기본 이벤트 방지
    downloadResume({ resumeId, resumeName });
  };

  return (
    <div className="relative h-auto w-[327px] overflow-hidden rounded-xl border border-grayscale-200 bg-white p-4 shadow-md transition-transform duration-300 hover:scale-[1.02] lg:w-[372px]">
      <div className="flex h-full flex-col">
        {/* 상단 영역: 지원일시와 이력서 링크 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-grayscale-500 md:text-base">
            <span>지원일시</span>
            <span>|</span>
            <span>{formatLocalDate(createdAt, true)}</span>
          </div>
          <button
            onClick={handleResumeDownload}
            className="decoration-grayscale-600/50 hover:text-grayscale-600 hover:decoration-grayscale-600 text-sm font-medium text-grayscale-500 underline decoration-1 underline-offset-4 hover:cursor-pointer md:text-base"
          >
            이력서 다운로드
          </button>
        </div>

        {/* 중앙 컨텐츠 영역: 가게 정보, 제목, 설명 */}
        <div className="flex-1 space-y-3 py-4">
          {/* 가게 프로필 이미지와 이름 */}
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full md:h-14 md:w-14">
              {form.owner.imageUrl ? (
                <Image src={form.owner.imageUrl} alt={form.owner.storeName} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-grayscale-100">
                  <MdOutlineImage className="size-6 text-grayscale-400" />
                </div>
              )}
            </div>
            <span className="text-grayscale-900 text-base font-medium md:text-lg">{form.owner.storeName}</span>
          </div>

          {/* 공고 제목 */}
          <div className="text-grayscale-900 text-lg font-bold md:text-xl">{form.title}</div>

          {/* 공고 설명 (2줄 제한) */}
          <p className="text-grayscale-600 line-clamp-2 text-sm md:line-clamp-2 md:text-base">{form.description}</p>
        </div>

        {/* 하단 상태 표시 영역: 지원 상태와 모집 상태 */}
        <div className="text-grayscale-700 mt-4 flex h-[50px] items-center justify-start gap-2 rounded-2xl text-sm lg:text-base">
          <div className="rounded-[4px] border border-primary-orange-300 bg-primary-orange-50">
            <Chip
              label={translateStatus(status as ApplicationStatusType)}
              variant={getStatusVariant(status as ApplicationStatusType)}
              textStyle="font-bold"
            />
          </div>
          <div className="rounded-[4px] border border-primary-orange-300 bg-primary-orange-50">
            <Chip
              label={getRecruitmentStatus(form.recruitmentEndDate)}
              variant={getRecruitmentStatus(form.recruitmentEndDate) === "모집 중" ? "positive" : "negative"}
              textStyle="font-bold"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplicationListItem;
