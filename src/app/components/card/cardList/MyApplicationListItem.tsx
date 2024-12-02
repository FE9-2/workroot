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

// 지원 상태에 따른 Chip 컴포넌트의 variant를 반환하는 함수
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

// 지원 상태에 따른 한글 라벨을 반환하는 함수
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

// 내 지원 내역 카드 아이템 컴포넌트
const MyApplicationListItem = ({ createdAt, status, resumeId, resumeName, form }: ApplicationListItemProps) => {
  // 현재 공고의 모집 상태를 가져옴
  const recruitmentStatus = getRecruitmentStatus(new Date(form.recruitmentEndDate));

  // 이력서 다운로드 핸들러
  const handleResumeDownload = async () => {
    try {
      // API를 통해 이력서 파일을 다운로드
      const response = await axios.get(`/api/resumes/${resumeId}`, {
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
    <div className="relative h-auto w-full overflow-hidden rounded-xl border border-grayscale-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:scale-[1.02] sm:h-[219px] sm:w-[375px] md:h-[328px] md:w-[477px]">
      <div className="flex h-full flex-col">
        {/* 상단 영역: 지원일시와 이력서 링크 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-grayscale-500 md:text-base">
            <span>지원일시</span>
            <span>|</span>
            <span>{formatRecruitDate(createdAt, true)}</span>
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
              <Image src={form.owner.imageUrl} alt={form.owner.storeName} fill className="object-cover" />
            </div>
            <span className="text-grayscale-900 text-base font-medium md:text-lg">{form.owner.storeName}</span>
          </div>

          {/* 공고 제목 */}
          <div className="text-grayscale-900 text-lg font-bold md:text-xl">{form.title}</div>

          {/* 공고 설명 (2줄 제한) */}
          <p className="text-grayscale-600 line-clamp-2 text-sm md:line-clamp-2 md:text-base">{form.description}</p>
        </div>

        {/* 하단 상태 표시 영역: 지원 상태와 모집 상태 */}
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
