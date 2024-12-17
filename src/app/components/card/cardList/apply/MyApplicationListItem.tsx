import { getRecruitmentStatus } from "@/utils/recruitDateFormatter";
import { formatLocalDate } from "@/utils/workDayFormatter";
import Chip from "@/app/components/chip/Chip";
import Image from "next/image";
import { ApplicationStatusType } from "@/types/application";
import axios from "axios";
import toast from "react-hot-toast";
import { MyApplicationType } from "@/types/response/user";
import { MdOutlineImage } from "react-icons/md";
import translateStatus, { getStatusVariant } from "@/utils/translateStatus";

const MyApplicationListItem = ({ createdAt, status, resumeId, resumeName, form }: MyApplicationType) => {
  // 이력서 다운로드 핸들러
  const handleResumeDownload = async () => {
    try {
      // API를 통해 이력서 파일을 다운로드
      const response = await axios.get(`/api/resume/${resumeId}/download`, {
        responseType: "blob",
      });

      // Blob 객체 생성 및 다운로드 링크 생성
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // 가상의 링크를 생성하여 다운로드 실행
      const link = document.createElement("a");
      link.href = url;
      link.download = resumeName || `이력서_${resumeId}.pdf`;
      document.body.appendChild(link);
      link.click();

      // 메모리 정리
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      toast.success("이력서가 다운로드되었습니다.");
    } catch (error) {
      console.error("Resume download error:", error);
      toast.error("이력서 다운로드에 실패했습니다.");
    }
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
            이력서 보기
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
