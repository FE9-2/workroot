"use client";

import { IoLocationSharp } from "react-icons/io5";
import BaseInput from "./BaseInput";
import { BaseInputProps } from "@/types/textInput";
import { forwardRef, useCallback, useState, useEffect } from "react";
import Script from "next/script";

// DaumPostcode 타입 정의
interface DaumPostcodeData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
  [key: string]: string;
}

declare global {
  interface Window {
    daum: {
      Postcode: new (config: { oncomplete: (data: DaumPostcodeData) => void }) => {
        open: () => void;
      };
    };
  }
}

interface LocationInputProps extends BaseInputProps {
  onAddressChange?: (fullAddress: string) => void;
  readOnly?: boolean;
  value?: string;
}

const LocationInput = forwardRef<HTMLInputElement, LocationInputProps>(
  (
    { type = "text", variant, errormessage, feedbackMessage, onAddressChange, readOnly = true, value, ...props },
    ref
  ) => {
    const [address, setAddress] = useState("");

    useEffect(() => {
      if (value) {
        setAddress(value);
      }
    }, [value]);

    const handleOpenPostcode = useCallback(() => {
      if (typeof window === "undefined" || !window.daum) return;

      new window.daum.Postcode({
        oncomplete: (data: DaumPostcodeData) => {
          const newAddress = data.address;
          setAddress(newAddress);
          onAddressChange?.(newAddress);
        },
      }).open();
    }, [onAddressChange]);

    return (
      <>
        <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" strategy="afterInteractive" />
        <div className="relative w-full">
          <BaseInput
            ref={ref}
            type={type}
            variant={variant || "white"}
            beforeIcon={<IoLocationSharp className="size-5 text-grayscale-100 lg:size-8" />}
            placeholder="클릭하여 주소를 검색하세요"
            value={address}
            readOnly={readOnly}
            errormessage={errormessage}
            feedbackMessage={feedbackMessage}
            onClick={handleOpenPostcode}
            {...props}
          />
        </div>
      </>
    );
  }
);

LocationInput.displayName = "LocationInput";

export default LocationInput;
