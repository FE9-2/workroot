"use client";

import { useState } from "react";
import { TextInputProps } from "@/types/textInput";
import { IoLocationSharp } from "react-icons/io5";
import WhiteTextInput from "./WhiteTextInput";

const LocationInput = ({ type, ...props }: TextInputProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  return (
    <WhiteTextInput
      type="text"
      beforeIcon={<IoLocationSharp className="size-4 text-gray-100 lg:size-6" />}
      placeholder="위치를 입력해주세요."
      errorMessage={errorMessage}
      feedbackMessage={feedbackMessage}
      {...props}
    />
  );
};

export default LocationInput;
