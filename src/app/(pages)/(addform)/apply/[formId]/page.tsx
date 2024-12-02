"use client";
import BaseInput from "@/app/components/input/text/BaseInput";
import Label from "../../component/Label";
import BaseTextArea from "@/app/components/input/textarea/BaseTextArea";
import UploadInput from "@/app/components/input/file/UploadInput";
import Button from "@/app/components/button/default/Button";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/tailwindUtil";
interface ApplyFormData {
  name: string;
  contact: string;
  career: number;
  resume: FileList;
  introduce: string;
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
      contact: "",
      resume: undefined,
      introduce: "",
      password: "",
    },
  });

  const onSubmit = (data: ApplyFormData) => {
    console.log(data);
    // 여기에 제출 로직 추가
  };

  const onTempSave = () => {
    const currentData = getValues();
    console.log("임시저장:", currentData);
    // 임시저장 로직 추가
  };
  const errorTextStyle =
    "absolute -bottom-[26px] right-1 text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]";
  return (
    <form className="my-8 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Label name="이름" />
      <BaseInput
        {...register("name", { required: "이름은 필수입니다" })}
        type="text"
        variant="white"
        placeholder="이름을 입력해주세요."
        errormessage={errors.name?.message}
      />

      <Label name="연락처" />
      <BaseInput
        {...register("contact", {
          required: "연락처는 필수입니다",
          pattern: {
            value: /^[0-9]+$/,
            message: "숫자만 입력해주세요",
          },
        })}
        type="text"
        variant="white"
        placeholder="숫자만 입력해주세요"
        errormessage={errors.contact?.message}
      />

      <Label name="경력(개월 수)" />
      <BaseInput
        {...register("career", {
          required: "경력은 필수입니다",
        })}
        type="number"
        variant="white"
        placeholder="숫자만 입력해주세요"
        errormessage={errors.career?.message}
      />
      <div className="relative flex w-full flex-col">
        <Label name="이력서" />
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

      <Label name="자기소개" />
      <BaseTextArea
        {...register("introduce", {
          required: "자기소개를 입력해주세요",
          maxLength: { value: 200, message: "최대 200자까지 입력 가능합니다." },
        })}
        variant="white"
        placeholder="최대 200자까지 입력 가능합니다."
        errormessage={errors.introduce?.message}
      />

      <Label name="비밀번호" />
      <div>
        <BaseInput
          {...register("password", {
            required: "비밀번호는 필수입니다.",
            minLength: { value: 4, message: "4자리 이상 입력해주세요." },
          })}
          type="password"
          variant="white"
          placeholder="비밀번호를 입력해주세요."
          errormessage={errors.password?.message}
        />
        <div className="mt-[6px] text-xs font-normal leading-[18px] text-grayscale-400">
          *지원내역 확인에 사용됩니다.
        </div>
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
