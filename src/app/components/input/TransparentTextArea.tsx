import { ChangeEvent } from "react";

interface TextAreaProp {
  name: string;
  register?: (name: string) => { onChange: (e: ChangeEvent<HTMLInputElement>) => void; onBlur: () => void; ref: any };
  rules?: boolean;
  size?: string;
  placeholder?: string;
  className?: string;
  bgColor?: string;
  border?: string;
  textColor?: string;
  disabled?: boolean;
  errorMessage?: string;
}

const TransparentTextArea = (props: TextAreaProp) => {
  return (
    <>
      <label className="hidden">{props.name}</label>
      <span className="relative">
        <textarea
          id={props.name}
          placeholder={props.placeholder}
          disabled={props.disabled}
          className={`h-[124px] w-[327px] resize-none rounded-lg border-[0.5px] border-grayscale-200 bg-transparent p-[14px] text-sm font-normal leading-[26px] text-black-400 caret-primary-orange-300 placeholder:text-grayscale-400 hover:border-grayscale-300 focus:border-primary-orange-300 focus:outline-none lg:h-[196px] lg:w-[640px] lg:py-[18px] lg:text-base lg:leading-8 ${props.textColor} ${props.border} ${props.bgColor} ${props.size} ${props.className} ${
            props.errorMessage ? "border-state-error" : "border-grayscale-200"
          }`}
        />
        {props.errorMessage && (
          <span
            className={`absolute -bottom-[22px] right-0 text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]`}
          >
            {props.errorMessage}
          </span>
        )}
      </span>
    </>
  );
};

export default TransparentTextArea;
