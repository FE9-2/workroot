import CardChipIcon from "@/app/components/card/cardList/CardChipIcon";
import Chip from "@/app/components/chip/Chip";
import ChipWithIcon from "@/app/components/chip/ChipWithIcon";
import React from "react";

// 알바폼 상세 페이지
export default function AlbaFormDetailPage({ formId }: { formId: number }) {
  return (
    <div className="container flex min-h-screen flex-col">
      <div className="h-[562px] bg-black-100">지도영역</div>
      <div>
        <div className="mt-20 w-[770px] space-y-10">
          <div className="flex items-center">
            <Chip label="공개여부" variant="positive" />
            <Chip label="모집중" variant="positive" />
            <p className="text-sm text-grayscale-500">2024. 05. 04 12:30:54 등록</p>
          </div>
          <div className="mb-4 flex gap-4">
            <span className="text-base text-black-400 underline">코드잇</span>
            <span className="text-grayscale-500">서울 종로구 ・ 경력 무관</span>
          </div>
          <p className="text-3xl font-bold">코드잇 스터디카페 관리 (주말 오전) 모집합니다 서울 종로구 용산구 서대문 </p>
          <CardChipIcon
            formData={{
              updatedAt: new Date(),
              createdAt: new Date(),
              isPublic: true,
              scrapCount: 0,
              applyCount: 0,
              imageUrls: [],
              recruitmentEndDate: new Date(),
              recruitmentStartDate: new Date(),
              title: "제목",
              id: 1,
            }}
          />
          <div className="text-2xl">
            코드잇 스터디 카페입니다. 주말 토, 일 오픈업무 하실 분 구합니다. 성실하게 일하실 분들만 지원 바랍니다.
            작성한 이력서(사진 부착)를 알바폼에 첨부해주시고, 아래와 같이 문자 보내주세요. 근무 중 전화통화 불가합니다.
            예) OOO입니다. __에 거주합니다. 알바폼 지원. 이력서 검토 후 면접진행자에 한해 면접일정 개별
            연락드리겠습니다. 많은 지원 바랍니다.
          </div>
        </div>
        <div>{/* 오른쪽 콘텐츠 */}</div>
      </div>
    </div>
  );
}
