import { BaseTextAreaProps } from "@/types/textInput";

const BaseTextArea = (props: BaseTextAreaProps) => {
  // 공통 스타일
  const baseStyle = "resize-none rounded-lg focus:outline-none";
  const sizingStyle = "h-[124px] w-[327px] p-[14px] lg:h-[196px] lg:w-[640px] lg:py-[18px]";
  const typographyStyle =
    "text-black-400 placeholder:text-grayscale-400 text-sm font-normal leading-[26px] lg:text-base lg:leading-8";

  // variant에 따른 배경색 & border 스타일
  const variantStyle =
    props.variant === "white"
      ? "bg-background-200 border border-transparent hover:border-line-200 focus:border-grayscale-400"
      : "bg-transparent border-[0.5px] border-grayscale-200 caret-primary-orange-300 hover:border-grayscale-300 focus:border-primary-orange-300";

  const errorStyle = props.errorMessage ? "border-state-error" : "";

  const combinedStyle = `${baseStyle} ${sizingStyle} ${typographyStyle} ${errorStyle} ${variantStyle} ${props.className || ""}`;

  return (
    <>
      <label className="hidden">{props.name}</label>
      <span className="relative">
        <textarea id={props.name} placeholder={props.placeholder} disabled={props.disabled} className={combinedStyle} />
        {props.errorMessage && (
          <span className="absolute -bottom-[22px] right-0 text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]">
            {props.errorMessage}
          </span>
        )}
      </span>
    </>
  );
};

export default BaseTextArea;
