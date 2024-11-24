import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface FloatingBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "orange" | "white";
  icon?: ReactNode;
  label?: string;
}

const FloatingBtn: React.FC<FloatingBtnProps> = ({ variant = "orange", icon, label, className, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center transition-colors font-medium h-12 rounded-full";

  const variants = {
    orange: "bg-primary-orange-300 text-white hover:bg-primary-orange-200",
    white: "bg-white text-primary-orange-300 border border-primary-orange-300 hover:bg-gray-100",
  };

  const widthStyles = label ? "w-auto px-4" : "w-12";

  return (
    <button className={`${baseStyles} ${variants[variant]} ${widthStyles} ${className}`.trim()} {...props}>
      {icon && <span className={label ? "mr-2" : ""}>{icon}</span>}
      {label}
    </button>
  );
};

export default FloatingBtn;
