import { BaseTextAreaProps } from "@/types/textInput";

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

  // textareaStyle
  const baseStyle = "resize-none focus:outline-none h-full w-full";
  const textStyle =
    "text-black-400 placeholder:text-gray-400 text-sm font-normal leading-[26px] lg:text-base lg:leading-8";

  //  wrapperStyle
  const variantStyle = `${variantStyles[props.variant].border} ${variantStyles[props.variant].hover} ${variantStyles[props.variant].focus}`;
  const errorStyle = props.errorMessage ? "border-state-error" : "";

  const bgStyle = variantStyles[props.variant].bg;

  const textareaStyle = `${baseStyle} ${bgStyle} ${textStyle} ${props.className || ""}`;

  const wrapperStyle = `p-[14px] lg:py-[18px] relative rounded-lg w-[327px] lg:w-[640px] h-[132px] lg:h-[160px] ${variantStyle} ${bgStyle} ${errorStyle}`;

  return (
    <div className={wrapperStyle}>
      <label className="hidden">{props.name}</label>
      <textarea id={props.name} placeholder={props.placeholder} disabled={props.disabled} className={textareaStyle} />
      {props.errorMessage && (
        <span className="absolute -bottom-[22px] right-0 pr-2 text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]">
          {props.errorMessage}
        </span>
      )}
    </div>
  );
};

export default BaseTextArea;
