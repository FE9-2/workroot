"use client";

import { forwardRef, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { AuthInputProps } from "@/types/textInput";

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  (
    {
      variant = "transparent",
      size = "w-full h-full",
      errormessage,
      type = "text",
      name,
      value,
      placeholder,
      disabled,
      readOnly,
      onChange,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    // 비밀번호 표시/숨김 토글
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // 입력 타입 결정
    const getInputType = () => {
      if (type === "password") {
        return showPassword ? "text" : "password";
      }
      return type;
    };

    // 스타일 설정
    const baseStyles = {
      wrapper: "relative flex items-center",
      input: `
        w-full rounded-lg border border-grayscale-200 bg-transparent px-3 py-2
        text-sm text-grayscale-900 placeholder:text-grayscale-400
        focus:border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500
        disabled:cursor-not-allowed disabled:opacity-50
      `,
      errorInput: "border-state-error focus:border-state-error focus:ring-state-error",
      errorMessage: "mt-1 text-xs text-state-error",
      icon: "absolute right-3 cursor-pointer text-grayscale-400 hover:text-grayscale-500",
    };

    // variant에 따른 추가 스타일
    const variantStyles = {
      transparent: "",
      white: "bg-white",
    };

    // 에러 상태에 따른 input 스타일 결정
    const inputStyles = `
      ${baseStyles.input} 
      ${size} 
      ${variantStyles[variant]}
      ${errormessage ? baseStyles.errorInput : ""}
    `;

    return (
      <div className="space-y-1">
        <div className={baseStyles.wrapper}>
          <input
            ref={ref}
            type={getInputType()}
            name={name}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            onChange={onChange}
            onBlur={onBlur}
            className={inputStyles}
            {...rest}
          />
          {type === "password" && (
            <button type="button" onClick={togglePasswordVisibility} className={baseStyles.icon} tabIndex={-1}>
              {showPassword ? <LuEye className="size-4" /> : <LuEyeOff className="size-4" />}
            </button>
          )}
        </div>
        {errormessage && <p className={baseStyles.errorMessage}>{errormessage}</p>}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;
