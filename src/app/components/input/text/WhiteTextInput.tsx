import { TextInputProps } from "@/types/textInput";
import BaseInput from "./BaseInput";

const TransperTextInput = (props: TextInputProps) => {
  return <BaseInput {...props} variant="white" />;
};

export default TransperTextInput;

/* 
@name: string // 필수값
@type: "text" | "password" | ... // 필수값
@size: "w-[00px] h-[00px] lg:w-[00px] lg:h-[00px]"  
@placeholder: string
@errorMessage: string // 에러메시지 + 테두리 색상 변경
@feedbackMessage: string // 메시지만 띄우고 색상 변경 X
@disabled: boolean
@wrapperClassName?: string; // 부가적인 tailwind css 클래스
@innerClassName?: string; // 부가적인 tailwind css 클래스
*/
