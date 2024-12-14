"use client";

import { useState, useCallback } from "react";

// 드롭다운 메뉴의 열림/닫힘 상태를 관리하는 커스텀 훅
export const useDropdownOpen = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 드롭다운 메뉴 토글 핸들러
  const handleOpenDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, setIsOpen, handleOpenDropdown };
};
