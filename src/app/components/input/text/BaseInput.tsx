"use client";

import { forwardRef, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { BaseInputProps } from "@/types/textInput";

/* 
@name: string - 필수값
@type: "text" | "password" | ... - 필수값
@variant: "white" | "transparent";
@size: "w-[00px] h-[00px] lg:w-[00px] lg:h-[00px]" - 기본값: "w-[327px] h-[54px] lg:w-[640px] lg:h-[64px]"
@placeholder: string
@errorMessage: string - 에러메시지 + 테두리 색상 변경
@feedbackMessage: string - 메시지만 띄우고 색상 변경 X
@disabled: boolean
@wrapperClassName?: string; - 부가적인 tailwind css 클래스
@innerClassName?: string; - 부가적인 tailwind css 클래스
@beforeIcon?: React.ReactNode; - 앞에 위치하는 아이콘
@afterIcon?: React.ReactNode; - 뒤에 위치하는 아이콘
@anotherHoverStyle?: string; - 추가적인 hover 스타일 - 없으면 기본값
*/

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: "white" | "transparent";
  size?: string;
  errorMessage?: string;
  feedbackMessage?: string;
  wrapperClassName?: string;
  innerClassName?: string;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  afterString?: string;
  anotherHoverStyle?: string;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      variant,
      size,
      errorMessage,
      feedbackMessage,
      wrapperClassName,
      innerClassName,
      beforeIcon,
      afterIcon,
      afterString,
      anotherHoverStyle,
      type,
      name,
      value,
      placeholder,
      disabled,
      readOnly,
      onChange,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const [eyeOn, setEyeOn] = useState(false);
    const toggleType = () => {
      setEyeOn(!eyeOn);
    };

    const inputType = type === "password" && eyeOn ? "text" : type;

    const variants = {
      white: {
        bgColor: "bg-background-200",
        borderColor: "border border-transparent",
        hoverColor: anotherHoverStyle || "hover:border-gray-200 hover:bg-background-300",
        focusColor: "[&:has(input:focus)]:border-primary-orange-300 caret-primary-orange-300",
      },
      transparent: {
        bgColor: "bg-transparent",
        borderColor: "border-[0.5px] border-gray-200",
        hoverColor: "hover:border-gray-300",
        focusColor: "[&:has(input:focus)]:border-primary-orange-300 caret-primary-orange-300",
      },
    };

    const defaultSize = "w-[327px] h-[54px] lg:w-[640px] lg:h-[64px]";
    const sizeStyles = size || defaultSize;

    // input style
    const baseStyle = "focus:outline-none h-full w-full";
    const textStyle =
      "text-black-400 placeholder:text-gray-400 text-sm font-normal leading-[26px] lg:text-base lg:leading-8";

    // wrapperStyle
    const variantStyle = `${variants[variant].bgColor} ${variants[variant].borderColor} ${variants[variant].hoverColor} ${variants[variant].focusColor}`;
    const errorStyle = errorMessage ? "!border-state-error" : "";
    const errorTextStyle =
      "absolute -bottom-[26px] text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]";

    const wrapperStyle = `relative flex gap-2 items-center justify-between rounded-lg border-[0.5px] p-[14px] lg:py-4 ${variantStyle} ${sizeStyles} ${errorStyle} ${wrapperClassName}`;
    const inputStyle = `bg-transparent ${baseStyle} ${textStyle} ${innerClassName}`;

    return (
      <div>
        <div className={wrapperStyle}>
          {beforeIcon && <div className="flex items-center justify-center">{beforeIcon}</div>}
          <label className="hidden">{name}</label>
          <input
            ref={ref}
            name={name}
            type={inputType}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            onChange={onChange}
            onBlur={onBlur}
            className={inputStyle}
            {...rest}
          />
          {type === "password" && (
            <div onClick={toggleType} className="cursor-pointer">
              {eyeOn ? <LuEye className="text-gray-200" /> : <LuEyeOff className="text-gray-200" />}
            </div>
          )}
          {afterIcon && <div>{afterIcon}</div>}
          {afterString && (
            <div className="text-sm font-normal leading-[26px] text-black-400 lg:text-xl lg:leading-8">
              {afterString}
            </div>
          )}
          {errorMessage && <span className={`${errorTextStyle} right-0 pr-2`}>{errorMessage}</span>}
          {feedbackMessage && <span className={`${errorTextStyle} left-0 pl-2`}>{feedbackMessage}</span>}
        </div>
      </div>
    );
  }
);

BaseInput.displayName = "BaseInput";

export default BaseInput;
