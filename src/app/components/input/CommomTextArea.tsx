import { ChangeEvent } from "react";

interface TextAreaProp {
  name?: string;
  register?: (name: string) => { onChange: (e: ChangeEvent<HTMLInputElement>) => void; onBlur: () => void; ref: any };
  errorMessage?: string;
  rules?: boolean;
  size?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  bgColor?: string;
  borderColor?: string;
  borderWidth?: string;
  textColor?: string;
  disabled?: boolean;
  errorAlign?: string;
}

const CommomTextArea = (props: TextAreaProp) => {
  // value 상태 관리
  // onChange함수
  // error 상태 관리? 또는 메시지 상태관리? : value 없으면 errorMessage 출력

  return (
    <>
      <label className="hidden">{props.name}</label>
      <textarea
        id={props.name}
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.disabled}
        className={`resize-none rounded-lg border-gray-200 p-[14px] ${
          props.errorMessage ? "border-state-error" : "border-gray-200"
        } font-normal caret-primary-orange-300 hover:border-gray-300 focus:border-primary-orange-300 focus:outline-none lg:py-[18px] ${props.borderWidth} ${props.textColor} ${props.bgColor} ${props.borderColor} ${props.size} ${props.className}`}
        onChange={props.onChange}
      />
      {props.errorMessage && <p className={`text-sm text-state-error ${props.errorAlign}`}>{props.errorMessage}</p>}
    </>
  );
};

export default CommomTextArea;
