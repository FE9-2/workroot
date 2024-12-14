"use client";

import { useState, useCallback } from "react";

export const useDropdownOpen = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, setIsOpen, handleOpenDropdown };
};
