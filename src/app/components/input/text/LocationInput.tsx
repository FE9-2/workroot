"use client";

import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import BaseInput from "./BaseInput";
import { BaseInputProps } from "@/types/textInput";

const LocationInput = ({ type, variant, ...props }: BaseInputProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  return (
    <BaseInput
      type="text"
      variant="white"
      beforeIcon={<IoLocationSharp className="size-6 text-gray-100 lg:size-9" />}
      placeholder="위치를 입력해주세요."
      errorMessage={errorMessage}
      feedbackMessage={feedbackMessage}
      {...props}
    />
  );
};

export default LocationInput;
