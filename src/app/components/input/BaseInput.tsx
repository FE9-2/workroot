"use client";

import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { BaseInputProps } from "@/types/textInput";

/* @type: password, email, text, number
@errorPosition: left, right
@errorMessage: string
@placeholder: string
@beforeIcon: React.ReactNode
@afterIcon: React.ReactNode
*/

const BaseInput = (props: BaseInputProps) => {
  const [eyeOn, setEyeOn] = useState(false);
  const toggleType = () => {
    setEyeOn(!eyeOn);
  };
  const inputType = props.type === "password" && eyeOn ? "text" : props.type;
  const variantStyle = // wrapperStyle
    props.variant === "white"
      ? "bg-background-100 border-transparent hover:border-gray-200 [&:has(input:focus)]:border-gray-400"
      : "bg-transparent border-gray-200 caret-primary-orange-300 hover:border-gray-300 [&:has(input:focus)]:border-primary-orange-300";

  const sizeStyle = "w-[327px] h-[54] lg:w-[640px] lg:h-[64px]";
  const inputBgStyle = props.variant === "white" ? "bg-background-100" : "bg-transparent";
  const textStyle =
    "placeholder:text-gray-400 text-black-400 text-sm font-normal leading-[26px] lg:text-base lg:leading-8";
  const errorStyle = props.errorMessage ? "border-state-error" : "";

  const wrapperStyle = `flex items-center justify-between rounded-lg border-[0.5px] p-[14px] lg:py-4 ${variantStyle} ${sizeStyle} ${errorStyle} ${props.className}`;
  const inputStyle = `font-normal w-full h-full focus:outline-none ${inputBgStyle} ${textStyle} ${props.className}`;
  return (
    <div className="relative">
      <div className={wrapperStyle}>
        {props.beforeIcon && <div className="absolute left-0">{props.beforeIcon}</div>}
        <label className="hidden">{props.name}</label>
        <input id={props.name} type={inputType} placeholder={props.placeholder} className={inputStyle} />
        {props.type === "password" && (
          <div onClick={toggleType} className="cursor-pointer">
            {eyeOn ? <LuEye className="text-gray-200" /> : <LuEyeOff className="text-gray-200" />}
          </div>
        )}
      </div>
      {props.errorMessage && (
        <span className="text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]">
          {props.errorMessage}
        </span>
      )}
      {props.afterIcon && <div className="absolute right-0">{props.afterIcon}</div>}
    </div>
  );
};

export default BaseInput;
