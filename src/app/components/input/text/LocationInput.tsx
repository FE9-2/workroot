"use client";

import { IoLocationSharp } from "react-icons/io5";
import BaseInput from "./BaseInput";
import { BaseInputProps } from "@/types/textInput";
import { forwardRef } from "react";

const LocationInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ type = "text", variant, errormessage, feedbackMessage, ...props }, ref) => {
    return (
      <BaseInput
        ref={ref}
        type={type}
        variant={variant || "white"}
        beforeIcon={<IoLocationSharp className="size-6 text-grayscale-100 lg:size-8" />}
        placeholder="위치를 입력해주세요."
        errormessage={errormessage}
        feedbackMessage={feedbackMessage}
        {...props}
      />
    );
  }
);

LocationInput.displayName = "LocationInput";

export default LocationInput;
