import BaseTextArea from "./BaseTextArea";
import { TextAreaProps } from "@/types/textInput";

const TransparentTextArea = (props: TextAreaProps) => {
  return <BaseTextArea {...props} variant="transparent" />;
};

export default TransparentTextArea;

/*
@name: string // 필수값
@size: "w-[00px] h-[00px] lg:w-[00px] lg:h-[00px]" // 기본값: "w-[327px] h-[132px] lg:w-[640px] lg:h-[160px]"
@placeholder: string
@errorMessage: string // 에러메시지 + 테두리 색상 변경
@disabled: boolean
@wrapperClassName?: string; // 부가적인 tailwind css 클래스
@innerClassName?: string; // 부가적인 tailwind css 클래스
*/
