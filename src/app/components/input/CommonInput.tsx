"use client";

import { ChangeEvent, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface InputProp {
  type: string;
  name?: string;
  register?: (name: string) => { onChange: (e: ChangeEvent<HTMLInputElement>) => void; onBlur: () => void; ref: any };
  errors?: boolean;
  rules?: boolean;
  size?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CommonInput = (props: InputProp) => {
  const [eyeOn, setEyeOn] = useState(false);
  const toggleType = () => {
    setEyeOn(!eyeOn);
  };
  const inputType = props.type === "password" && eyeOn ? "text" : props.type;

  return (
    <>
      <label className="hidden">{props.name}</label>
      <input
        id={props.name}
        type={inputType}
        placeholder={props.placeholder}
        value={props.value}
        className={`rounded-lg border-[0.5px] p-[14px] font-normal ${props.className}`}
        onChange={props.onChange}
      />
      {props.type === "password" && (
        <div onClick={toggleType} className="cursor-pointer">
          {eyeOn ? <LuEye /> : <LuEyeOff />}
        </div>
      )}
      {props.errors && <p className="text-sm text-red-500">{props.errors}</p>}
    </>
  );
};

export default CommonInput;
