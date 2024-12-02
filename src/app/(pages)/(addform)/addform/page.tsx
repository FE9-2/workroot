import TopMenuDropdown from "@/app/components/button/dropdown/TopMenuDropdown";
import Label from "../component/Label";
import BaseInput from "@/app/components/input/text/BaseInput";
import BaseTextArea from "@/app/components/input/textarea/BaseTextArea";
import ImageInput from "@/app/components/input/file/ImageInput/ImageInput";
import DatePickerInput from "@/app/components/input/dateTimeDaypicker/DatePickerInput";
import { useForm } from "react-hook-form";

interface AddFormData {
  isPublic: boolean;
  hourlyWage: number;
  isNegotiableWorkDays: boolean;
  workDays: string[];
  workEndTime: string;
  workStartTime: string;
  workEndDate: string;
  workStartDate: string;
  location: string;
  preferred: string;
  age: string;
  education: string;
  gender: string;
  numberOfPositions: number;
  imageUrls: string[];
  recruitmentEndDate: string;
  recruitmentStartDate: string;
  description: string;
  title: string;
}

// 알바폼 만들기 - 사장님
export default function AddForm() {
  const { register, handleSubmit } = useForm<AddFormData>();
  const onSubmit = (data: AddFormData) => {
    console.log(data);
  };
  return (
    <>
      <TopMenuDropdown
        options={[
          { label: "모집 내용", value: "1" },
          { label: "모집 조건", value: "2" },
          { label: "근무 조건", value: "3" },
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>모집 내용</Label>
        <BaseInput {...register("title")} type="text" variant="white" />
        <Label>소개글</Label>
        <BaseTextArea
          {...register("description", {
            required: "자기소개를 입력해주세요",
            maxLength: { value: 200, message: "최대 200자까지 입력 가능합니다." },
          })}
          variant="white"
        />
        {/* <Label>모집 기간</Label>
        <DatePickerInput />
        <Label>이미지 첨부</Label>
        <ImageInput /> */}
      </form>
    </>
  );
}
