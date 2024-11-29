import { getRecruitmentStatus } from "@/utils/recruitDateFormatter";
import { formatRecruitDate } from "@/utils/workDayFormatter";
import Chip from "@/app/components/chip/Chip";
import Image from "next/image";
import { applicationStatus, ApplicationStatus } from "@/types/application";
import axios from "axios";
import toast from "react-hot-toast";

interface Owner {
  imageUrl: string;
  storeName: string;
  id: number;
}

interface Form {
  owner: Owner;
  recruitmentEndDate: string;
  recruitmentStartDate: string;
  description: string;
  title: string;
  id: number;
}

interface ApplicationListItemProps {
  updatedAt: Date;
  createdAt: Date;
  status: ApplicationStatus;
  resumeName: string;
  resumeId: number;
  form: Form;
  id: number;
}

const getStatusVariant = (status: ApplicationStatus) => {
  switch (status) {
    case applicationStatus.HIRED:
      return "positive";
    case applicationStatus.REJECTED:
      return "negative";
    default:
      return "positive";
  }
};

const getStatusLabel = (status: ApplicationStatus) => {
  switch (status) {
    case applicationStatus.HIRED:
      return "채용 완료";
    case applicationStatus.REJECTED:
      return "거절";
    case applicationStatus.INTERVIEW_PENDING:
      return "면접 대기";
    case applicationStatus.INTERVIEW_COMPLETED:
      return "면접 완료";
    default:
      return status;
  }
};

const MyApplicationListItem = ({ createdAt, status, resumeId, resumeName, form }: ApplicationListItemProps) => {
  const recruitmentStatus = getRecruitmentStatus(new Date(form.recruitmentEndDate));

  const handleResumeDownload = async () => {
    try {
      const response = await axios.get(`/api/resumes/${resumeId}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = resumeName || `이력서_${resumeId}.pdf`;
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      toast.success("이력서가 다운로드되었습니다.");
    } catch (error) {
      console.error("Resume download error:", error);
      toast.error("이력서 다운로드에 실패했습니다.");
    }
  };

  return (
    <div className="relative h-auto w-full overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:scale-[1.02] sm:h-[219px] sm:w-[375px] md:h-[328px] md:w-[477px]">
      <div className="flex h-full flex-col">
        {/* 상단 영역: 지원일시와 이력서 링크 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500 md:text-base">
            <span>지원일시</span>
            <span>|</span>
            <span>{formatRecruitDate(createdAt, true)}</span>
          </div>
          <button
            onClick={handleResumeDownload}
            className="text-sm font-medium text-gray-500 underline decoration-gray-600/50 decoration-1 underline-offset-4 hover:cursor-pointer hover:text-gray-600 hover:decoration-gray-600 md:text-base"
          >
            이력서 보기
          </button>
        </div>

        {/* 중앙 컨텐츠 영역 */}
        <div className="flex-1 space-y-4 py-6">
          {/* 가게 정보 영역 */}
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full md:h-14 md:w-14">
              <Image src={form.owner.imageUrl} alt={form.owner.storeName} fill className="object-cover" />
            </div>
            <span className="text-base font-medium text-gray-900 md:text-lg">{form.owner.storeName}</span>
          </div>

          {/* 제목 */}
          <h3 className="text-lg font-bold text-gray-900 md:text-xl">{form.title}</h3>

          {/* 설명 */}
          <p className="line-clamp-2 text-sm text-gray-600 md:line-clamp-2 md:text-base">{form.description}</p>
        </div>

        {/* 하단 상태 칩 영역 */}
        <div className="flex gap-2">
          <div className="rounded-[4px] border border-primary-orange-300 md:text-base">
            <Chip label={getStatusLabel(status)} variant={getStatusVariant(status)} />
          </div>
          <div className="rounded-[4px] border border-primary-orange-300 md:text-base">
            <Chip label={recruitmentStatus} variant={recruitmentStatus === "모집 중" ? "positive" : "negative"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplicationListItem;
