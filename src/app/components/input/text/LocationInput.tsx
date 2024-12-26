"use client";

import { IoLocationSharp } from "react-icons/io5";
import BaseInput from "./BaseInput";
import { BaseInputProps } from "@/types/textInput";
import { forwardRef, useCallback, useState, useEffect } from "react";
import Script from "next/script";

// Daum 우편번호 서비스에서 주소 검색 후 반환되는 데이터 타입
interface DaumPostcodeData {
  address: string; // 기본 주소 (도로명 주소 또는 지번 주소)
  addressType: string; // 검색된 주소 타입 (R: 도로명, J: 지번)
  bname: string; // 법정동/법정리 이름
  buildingName: string; // 건물명
  zonecode: string; // 우편번호
  [key: string]: string; // 기타 가능한 추가 필드들
}

// 전역 Window 객체에 다음 우편번호 서비스 타입 선언
declare global {
  interface Window {
    daum: {
      // Postcode 클래스 정의
      Postcode: new (config: {
        oncomplete: (data: DaumPostcodeData) => void; // 주소 검색 완료 시 실행될 콜백 함수
      }) => {
        open: () => void; // 주소 검색 팝업을 여는 메서드
      };
    };
  }
}

interface LocationInputProps extends BaseInputProps {
  onAddressChange?: (fullAddress: string) => void; // 주소가 변경될 때 호출될 콜백 함수
  readOnly?: boolean; // 입력 필드 읽기 전용 여부
  value?: string; // 초기 주소 값
}

const LocationInput = forwardRef<HTMLInputElement, LocationInputProps>(
  (
    { type = "text", variant, errormessage, feedbackMessage, onAddressChange, readOnly = true, value, ...props },
    ref
  ) => {
    const [address, setAddress] = useState("");

    // 외부에서 주소 값이 변경될 경우 내부 상태 업데이트
    useEffect(() => {
      if (value) {
        setAddress(value);
      }
    }, [value]);

    // 다음 우편번호 검색 팝업을 여는 함수
    const handleOpenPostcode = useCallback(() => {
      // SSR 환경이거나 다음 스크립트가 로드되지 않은 경우 실행하지 않음
      if (typeof window === "undefined" || !window.daum) return;

      // 다음 우편번호 검색 팝업 생성 및 설정
      new window.daum.Postcode({
        oncomplete: (data: DaumPostcodeData) => {
          const newAddress = data.address;
          setAddress(newAddress); // 내부 상태 업데이트
          onAddressChange?.(newAddress); // 부모 컴포넌트에 주소 변경 알림
        },
      }).open();
    }, [onAddressChange]);

    return (
      <>
        {/* 다음 우편번호 서비스 스크립트 로드 */}
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
