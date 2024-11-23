"use client";

import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { BaseInputProps } from "@/types/textInput";

const BaseInput = (props: BaseInputProps) => {
  const [eyeOn, setEyeOn] = useState(false);
  const toggleType = () => {
    setEyeOn(!eyeOn);
  };

  const inputType = props.type === "password" && eyeOn ? "text" : props.type;

  const variants = {
    white: {
      bgColor: "bg-background-200",
      borderColor: "border border-transparent",
      hoverColor: "hover:border-gray-200 hover:bg-background-300",
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
  const sizeStyles = props.size || defaultSize;

  // input style
  const baseStyle = "focus:outline-none h-full w-full";
  const textStyle =
    "text-black-400 placeholder:text-gray-400 text-sm font-normal leading-[26px] lg:text-base lg:leading-8";

  // wrapperStyle
  const variantStyle = `${variants[props.variant].bgColor} ${variants[props.variant].borderColor} ${variants[props.variant].hoverColor} ${variants[props.variant].focusColor}`;
  const errorStyle = props.errorMessage ? "!border-state-error" : "";
  const errorTextStyle =
    "absolute -bottom-[26px] text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]";

  const wrapperStyle = `relative flex items-center justify-between rounded-lg border-[0.5px] p-[14px] lg:py-4 ${variantStyle} ${sizeStyles} ${errorStyle} ${props.wrapperClassName}`;
  const inputStyle = `bg-transparent ${baseStyle} ${textStyle} ${props.innerClassName}`;
  return (
    <div>
      <div className={wrapperStyle}>
        {props.beforeIcon && <div className="absolute left-0">{props.beforeIcon}</div>}
        <label className="hidden">{props.name}</label>
        <input id={props.name} type={inputType} placeholder={props.placeholder} className={inputStyle} />
        {props.type === "password" && (
          <div onClick={toggleType} className="cursor-pointer">
            {eyeOn ? <LuEye className="text-gray-200" /> : <LuEyeOff className="text-gray-200" />}
          </div>
        )}
        {props.errorMessage && <span className={`${errorTextStyle} right-0 pr-2`}>{props.errorMessage}</span>}
        {props.feedbackMessage && <span className={`${errorTextStyle} left-0 pl-2`}>{props.feedbackMessage}</span>}
      </div>
      {props.afterIcon && <div className="absolute right-0">{props.afterIcon}</div>}
    </div>
  );
};

export default BaseInput;
