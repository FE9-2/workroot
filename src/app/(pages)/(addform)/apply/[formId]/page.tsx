"use client";
import BaseInput from "@/app/components/input/text/BaseInput";
import BaseTextArea from "@/app/components/input/textarea/BaseTextArea";
import UploadInput from "@/app/components/input/file/UploadInput";
import Button from "@/app/components/button/default/Button";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/tailwindUtil";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import Label from "../../component/Label";
interface ApplyFormData {
  name: string;
  phoneNumber: string;
  experienceMonths: number;
  resume: FileList;
  introduction: string;
  password: string;
}
// 알바폼 만들기 - 지원자 (지원하기)
export default function Apply() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    trigger,
    clearErrors,
    getValues,
  } = useForm<ApplyFormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      phoneNumber: "",
      experienceMonths: 0,
      resume: undefined, // resumeId, resumeName
      introduction: "",
      password: "",
    },
  });

  const formId = useParams().formId;
  const router = useRouter();
  const onSubmit = async (data: ApplyFormData) => {
    try {
      await axios.post(`/api/forms/${formId}/applications`, data);
      window.localStorage.removeItem("tempApplyData");
      toast.success("지원이 완료되었습니다.");
      router.back();
      /**
       * @Todo formId 페이지로 돌아가기 로 수정*/
    } catch (error) {
      toast.error("에러가 발생했습니다. 작성 중인 내용은 임시 저장됩니다.");
      console.error("Error submitting application:", error);
      onTempSave();
    }
  };

  const onTempSave = () => {
    const currentData = getValues();
    window.localStorage.setItem("tempApplyData", JSON.stringify(currentData));
    toast.success("임시 저장되었습니다.");
    console.log(currentData);
  };
  const errorTextStyle =
    "absolute -bottom-[26px] right-1 text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]";
  return (
    <form className="my-8 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Label>이름</Label>
      <BaseInput
        {...register("name", { required: "이름은 필수입니다" })}
        type="text"
        variant="white"
        placeholder="이름을 입력해주세요."
        errormessage={errors.name?.message}
      />

      <Label>연락처</Label>
      <BaseInput
        {...register("phoneNumber", {
          required: "연락처는 필수입니다",
          pattern: {
            value: /^[0-9]+$/,
            message: "숫자만 입력해주세요",
          },
        })}
        type="text"
        variant="white"
        placeholder="숫자만 입력해주세요"
        errormessage={errors.phoneNumber?.message}
      />

      <Label>경력(개월 수)</Label>
      <BaseInput
        {...register("experienceMonths", {
          required: "경력은 필수입니다",
        })}
        type="number"
        variant="white"
        placeholder="숫자만 입력해주세요"
        errormessage={errors.experienceMonths?.message}
      />
      <div className="relative flex w-full flex-col gap-4">
        <Label>이력서</Label>
        <UploadInput
          {...register("resume", {
            required: "이력서를 업로드해주세요.",
            validate: (fileList: FileList) => {
              if (!fileList || fileList.length === 0) {
                return "이력서는 필수입니다";
              }
              return true;
            },
            onChange: (e) => {
              if (e.target.files?.length > 0) {
                clearErrors("resume");
              }
              trigger("resume");
            },
          })}
          variant="upload"
          placeholder="파일 업로드하기"
        />
        {errors.resume && <p className={cn(errorTextStyle, "")}>{errors.resume.message}</p>}
      </div>

      <Label>자기소개</Label>
      <BaseTextArea
        {...register("introduction", {
          required: "자기소개를 입력해주세요",
          maxLength: { value: 200, message: "최대 200자까지 입력 가능합니다." },
        })}
        variant="white"
        placeholder="최대 200자까지 입력 가능합니다."
        errormessage={errors.introduction?.message}
      />
      <div className="relative">
        <Label>비밀번호</Label>
        <div className="absolute right-0 top-0 mt-[6px] text-xs font-normal leading-[18px] text-grayscale-400">
          지원내역 확인에 사용됩니다.
        </div>
      </div>
      <div>
        <BaseInput
          {...register("password", {
            required: "비밀번호는 필수입니다.",
            minLength: { value: 8, message: "8자리 이상 입력해주세요." },
            pattern: {
              value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
              message: "영문, 숫자, 특수문자 조합으로 입력해주세요.",
            },
          })}
          type="password"
          variant="white"
          placeholder="비밀번호를 입력해주세요."
          errormessage={errors.password?.message}
        />
      </div>
      <div className="lg:flex-2 mt-4 flex flex-col gap-[10px] lg:mt-8 lg:flex-row">
        <Button
          type="button"
          variant="outlined"
          width="md"
          color="orange"
          className="h-[58px] border lg:h-[72px] lg:text-xl lg:leading-8"
          onClick={onTempSave}
          disabled={!isDirty}
        >
          임시 저장
        </Button>
        <Button
          type="submit"
          variant="solid"
          width="md"
          color="orange"
          className="h-[58px] lg:h-[72px] lg:text-xl lg:leading-8"
          disabled={!isValid || !isDirty}
        >
          작성 완료
        </Button>
      </div>
    </form>
  );
}
