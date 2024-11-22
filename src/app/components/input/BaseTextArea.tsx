import { BaseTextAreaProps } from "@/types/textInput";

const BaseTextArea = (props: BaseTextAreaProps) => {
  // 공통 스타일
  const baseStyle = "resize-none focus:outline-none h-full w-full";
  const textStyle =
    "text-black-400 placeholder:text-gray-400 text-sm font-normal leading-[26px] lg:text-base lg:leading-8";

  const bgColor = {
    white: "bg-background-100",
    transparent: "bg-transparent",
  };
  const defaultColor = {
    white: "border-transparent",
    transparent: "border-gray-200",
  };
  const focusColor = {
    white: "[&:has(textarea:focus)]:border-gray-400",
    transparent: "[&:has(textarea:focus)]:border-primary-orange-300 caret-primary-orange-300",
  };

  const hoverColor = {
    white: "hover:border-gray-200",
    transparent: "hover:border-gray-300",
  };

  const borderWidth = {
    white: "border border-transparent",
    transparent: "border-[0.5px]",
  };

  // variant에 따른 배경색 & border 스타일
  const variantStyle = `${borderWidth[props.variant]} ${defaultColor[props.variant]} ${hoverColor[props.variant]} ${focusColor[props.variant]}`;

  const BgStyle = bgColor[props.variant];
  const textareaStyle = `${baseStyle} ${BgStyle} ${textStyle} ${props.className || ""}`;

  const errorStyle = props.errorMessage ? "border-state-error" : "";
  const wrapperStyle = `group p-[14px] lg:py-[18px] relative rounded-lg w-[327px] lg:w-[640px] h-[132px] lg:h-[160px] ${variantStyle} ${BgStyle} ${errorStyle}`;

  return (
    <div className={wrapperStyle}>
      <label className="hidden">{props.name}</label>
      <textarea id={props.name} placeholder={props.placeholder} disabled={props.disabled} className={textareaStyle} />
      {props.errorMessage && (
        <span className="absolute -bottom-[22px] right-0 text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]">
          {props.errorMessage}
        </span>
      )}
    </div>
  );
};

export default BaseTextArea;
