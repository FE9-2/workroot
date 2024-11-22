import { BaseTextAreaProps } from "@/types/textInput";

const BaseTextArea = (props: BaseTextAreaProps) => {
  // 공통 스타일
  const baseStyle = "resize-none focus:outline-none h-full w-full";
  const textStyle =
    "text-black-400 placeholder:text-grayscale-400 text-sm font-normal leading-[26px] lg:text-base lg:leading-8";

  // variant에 따른 배경색 & border 스타일
  const variantStyle =
    props.variant === "white"
      ? "bg-background-200 border border-transparent hover:border-line-200 [&:has(textarea:focus)]:border-grayscale-400"
      : "bg-transparent border-[0.5px] border-grayscale-200 caret-primary-orange-300 hover:border-grayscale-300 [&:has(textarea:focus)]:border-primary-orange-300";

  const textAreaBgStyle = props.variant === "white" ? "bg-background-200" : "bg-transparent";
  const textareaStyle = `${baseStyle} ${textAreaBgStyle} ${textStyle} ${props.className || ""}`;

  const errorStyle = props.errorMessage ? "border-state-error" : "";
  const wrapperStyle = `group p-[14px] lg:py-[18px] relative rounded-lg w-[327px] lg:w-[640px] h-[132px] lg:h-[160px] ${variantStyle} ${errorStyle}`;

  return (
    <>
      <label className="hidden">{props.name}</label>
      <div className={wrapperStyle}>
        <textarea id={props.name} placeholder={props.placeholder} disabled={props.disabled} className={textareaStyle} />
        {props.errorMessage && (
          <span className="absolute -bottom-[22px] right-0 text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]">
            {props.errorMessage}
          </span>
        )}
      </div>
    </>
  );
};

export default BaseTextArea;
