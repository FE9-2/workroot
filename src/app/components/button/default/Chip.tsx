"use client";
import React from "react";

interface ChipProps {
  label: string; // Chip에 표시될 텍스트
  onDelete?: () => void; // 삭제 버튼 클릭 시 실행할 함수
  onClick?: () => void; // Chip 클릭 시 실행할 함수
  className?: string; // 사용자 정의 스타일 클래스
  deletable?: boolean; // 삭제 버튼 표시 여부
  selected?: boolean; // 선택된 상태 표시 여부
}

const Chip: React.FC<ChipProps> = ({
  label,
  onDelete,
  onClick,
  className = "",
  deletable = false,
  selected = false,
}) => {
  return (
    <div
      className={`inline-flex cursor-pointer items-center rounded-full border px-4 py-1 text-sm font-medium transition ${
        selected
          ? "text-primary-blue-600 border-primary-blue-300 bg-primary-blue-100"
          : "bg-primary-gray-100 border-primay-gray-300 text-gray-700"
      } ${className}`}
      onClick={onClick}
    >
      <span className="mr-2">{label}</span>
      {deletable && (
        <button
          className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200"
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete();
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Chip;
