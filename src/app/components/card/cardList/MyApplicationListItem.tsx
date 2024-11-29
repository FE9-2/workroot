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
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* 상단 영역: 지원일시와 이력서 링크 */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm text-gray-500">지원일시 | {formatRecruitDate(createdAt)}</span>
        <button
          onClick={handleResumeDownload}
          className="text-sm font-medium text-primary-orange-300 hover:text-primary-orange-400"
        >
          이력서 보기
        </button>
      </div>

      {/* 가게 정보 영역 */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image src={form.owner.imageUrl} alt={form.owner.storeName} fill className="object-cover" />
        </div>
        <span className="text-base font-medium text-gray-900">{form.owner.storeName}</span>
      </div>

      {/* 제목 */}
      <h3 className="mb-2 text-lg font-bold text-gray-900">{form.title}</h3>

      {/* 설명 */}
      <p className="mb-4 line-clamp-2 text-sm text-gray-600">{form.description}</p>

      {/* 상태 칩 영역 */}
      <div className="flex gap-2">
        <Chip label={getStatusLabel(status)} variant={getStatusVariant(status)} />
        <Chip label={recruitmentStatus} variant={recruitmentStatus === "모집 중" ? "positive" : "negative"} />
      </div>
    </div>
  );
};

export default MyApplicationListItem;
