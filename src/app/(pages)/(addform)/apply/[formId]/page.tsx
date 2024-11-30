"use client";
import BaseInput from "@/app/components/input/text/BaseInput";
import Label from "../../component/Label";
import BaseTextArea from "@/app/components/input/textarea/BaseTextArea";
import UploadInput from "@/app/components/input/file/UploadInput";

// 알바폼 만들기 - 지원자 (지원하기)
export default function Apply() {
  return (
    <>
      <Label name="이름" essential={true} className="mb-4" />
      <BaseInput name="name" type="text" variant="white" placeholder="이름을 입력해주세요." />
      <Label name="연락처" essential={true} className="mb-4" />
      <BaseInput name="contact" type="number" variant="white" placeholder="숫자만 입력해주세요" />
      <Label name="경력(개월 수)" essential={true} className="mb-4" />
      <BaseInput name="career" type="number" variant="white" placeholder="숫자만 입력해주세요" />
      <Label name="이력서" essential={true} className="mb-4" />
      <UploadInput name="" variant="upload" placeholder="파일 업로드하기" />
      <Label name="자기소개" essential={true} className="mb-4" />
      <BaseTextArea name="introduce" variant="white" placeholder="최대 200자까지 입력 가능합니다." />
      <Label name="비밀번호" essential={true} className="mb-4" />
      <BaseInput name="password" type="password" variant="white" placeholder="비밀번호를 입력해주세요." />
    </>
  );
}
