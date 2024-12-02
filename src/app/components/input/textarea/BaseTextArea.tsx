import { forwardRef } from "react";
import { BaseTextAreaProps } from "@/types/textInput";
/*
@param variant: "white" | "transparent" - 필수값
@param name: string - 필수값
@param size: "w-[00px] h-[00px] lg:w-[00px] lg:h-[00px]" - 기본값: "w-[327px] h-[132px] lg:w-[640px] lg:h-[160px]"
@param placeholder: string
@param errormessage: string - 에러메시지 + 테두리 색상 변경
@param disabled: boolean
@param wrapperClassName?: string; - 부가적인 tailwind css 클래스
@param innerClassName?: string; - 부가적인 tailwind css 클래스
*/

const BaseTextArea = forwardRef<HTMLTextAreaElement, BaseTextAreaProps>((props, ref) => {
  const variantStyles = {
    white: {
      bg: "bg-background-200",
      border: "border border-transparent",
      focus: "[&:has(textarea:focus)]:border-grayscale-400",
      hover: "hover:border-grayscale-200",
    },
    transparent: {
      bg: "bg-transparent",
      border: "border-[0.5px] border-grayscale-200",
      focus: "[&:has(textarea:focus)]:border-primary-orange-300 caret-primary-orange-300",
      hover: "hover:border-grayscale-300",
    },
  };
  const defaultSize = "w-[327px] h-[132px] lg:w-[640px] lg:h-[160px]";
  const sizeStyles = props.size || defaultSize;

  // textareaStyle
  const baseStyle = "resize-none focus:outline-none h-full w-full";
  const textStyle =
    "text-black-400 placeholder:text-grayscale-400 placeholder:text-base placeholder:leading-[26px] lg:placeholder:text-xl lg:placeholder:leading-8 lg:text-xl font-normal lg:leading-8 text-base leading-[26px]";

  //  wrapperStyle
  const variantStyle = `${variantStyles[props.variant].border} ${variantStyles[props.variant].hover} ${variantStyles[props.variant].focus}`;
  const errorStyle = props.errormessage ? "!border-[0.5px] border-state-error" : "";

  const bgStyle = variantStyles[props.variant].bg;

  const textareaStyle = `${baseStyle} ${bgStyle} ${textStyle} ${props.innerClassName || ""}`;
  const wrapperStyle = `p-[14px] lg:py-[18px] relative rounded-lg ${sizeStyles} ${variantStyle} ${bgStyle} ${errorStyle} ${props.wrapperClassName}`;

  return (
    <div className={wrapperStyle}>
      <label className="hidden">{props.name}</label>
      <textarea
        id={props.name}
        placeholder={props.placeholder}
        disabled={props.disabled}
        className={`${textareaStyle} scrollbar-custom`}
        ref={ref}
        {...props}
      />
      {props.errormessage && (
        <span className="absolute -bottom-[26px] right-0 pr-2 text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]">
          {props.errormessage}
        </span>
      )}
    </div>
  );
});

BaseTextArea.displayName = "BaseTextArea";

export default BaseTextArea;
