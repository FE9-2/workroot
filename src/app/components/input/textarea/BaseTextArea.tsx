import { BaseTextAreaProps } from "@/types/textInput";
/*
@variant: "white" | "transparent" - 필수값
@name: string - 필수값
@size: "w-[00px] h-[00px] lg:w-[00px] lg:h-[00px]" - 기본값: "w-[327px] h-[132px] lg:w-[640px] lg:h-[160px]"
@placeholder: string
@errorMessage: string - 에러메시지 + 테두리 색상 변경
@disabled: boolean
@wrapperClassName?: string; - 부가적인 tailwind css 클래스
@innerClassName?: string; - 부가적인 tailwind css 클래스
*/

const BaseTextArea = (props: BaseTextAreaProps) => {
  const variantStyles = {
    white: {
      bg: "bg-background-100",
      border: "border border-transparent",
      focus: "[&:has(textarea:focus)]:border-gray-400",
      hover: "hover:border-gray-200",
    },
    transparent: {
      bg: "bg-transparent",
      border: "border-[0.5px] border-gray-200",
      focus: "[&:has(textarea:focus)]:border-primary-orange-300 caret-primary-orange-300",
      hover: "hover:border-gray-300",
    },
  };
  const defaultSize = "w-[327px] h-[132px] lg:w-[640px] lg:h-[160px]";
  const sizeStyles = props.size || defaultSize;

  // textareaStyle
  const baseStyle = "resize-none focus:outline-none h-full w-full";
  const textStyle =
    "text-black-400 placeholder:text-gray-400 text-sm font-normal leading-[26px] lg:text-base lg:leading-8";

  //  wrapperStyle
  const variantStyle = `${variantStyles[props.variant].border} ${variantStyles[props.variant].hover} ${variantStyles[props.variant].focus}`;
  const errorStyle = props.errorMessage ? "!border-state-error" : "";

  const bgStyle = variantStyles[props.variant].bg;

  const textareaStyle = `${baseStyle} ${bgStyle} ${textStyle} ${props.innerClassName || ""}`;
  const wrapperStyle = `p-[14px] lg:py-[18px] relative rounded-lg ${sizeStyles} ${variantStyle} ${bgStyle} ${errorStyle} ${props.wrapperClassName}`;

  return (
    <div className={wrapperStyle}>
      <label className="hidden">{props.name}</label>
      <textarea id={props.name} placeholder={props.placeholder} disabled={props.disabled} className={textareaStyle} />
      {props.errorMessage && (
        <span className="absolute -bottom-[26px] right-0 pr-2 text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]">
          {props.errorMessage}
        </span>
      )}
    </div>
  );
};

export default BaseTextArea;
