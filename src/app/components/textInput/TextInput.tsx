"use client";

import { ChangeEvent, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface InputProp {
  type: string;
  name?: string;
  register?: boolean;
  errors?: boolean;
  rules?: boolean;
  size?: string;
  value?: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const TextInput = (props: InputProp) => {
  const [eyeOn, setEyeOn] = useState(false);
  const toggleType = () => {
    setEyeOn(!eyeOn);
  };
  return (
    <>
      <label>{props.name}</label>
      <input type={props.type} value={props.value} onChange={props.onChange} />
      {props.type === "password" && <div onClick={toggleType}>{eyeOn ? <LuEye /> : <LuEyeOff />}</div>}
    </>
  );
};

export default TextInput;
