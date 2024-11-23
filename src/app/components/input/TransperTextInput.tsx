import BaseInput from "./BaseInput";
import { BaseInputProps } from "@/types/textInput";

type TransperTextInputProps = Omit<BaseInputProps, "variant">;

const TransperTextInput = (props: TransperTextInputProps) => {
  return <BaseInput {...props} variant="transparent" />;
};

export default TransperTextInput;

/* 
@name: string // 필수값
@type: string // 필수값
@placeholder: string
@errorMessage: string
@feedbackMessage: string
@disabled: boolean
@wrapperClassName?: string; // 부가적인 tailwind css 클래스
@innerClassName?: string; // 부가적인 tailwind css 클래스
*/
