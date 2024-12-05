"use client";

import { IoLocationSharp } from "react-icons/io5";
import BaseInput from "./BaseInput";
import { BaseInputProps } from "@/types/textInput";

const LocationInput = ({ type = "text", errormessage, feedbackMessage, ...props }: BaseInputProps) => {
  return (
    <BaseInput
      type={type}
      beforeIcon={<IoLocationSharp className="size-6 text-grayscale-100 lg:size-8" />}
      placeholder="위치를 입력해주세요."
      errormessage={errormessage}
      feedbackMessage={feedbackMessage}
      {...props}
    />
  );
};

export default LocationInput;
