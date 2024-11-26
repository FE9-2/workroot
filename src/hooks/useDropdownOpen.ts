"use client";

import { useState } from "react";

export const useDropdownOpen = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  return { isOpen, handleOpenDropdown };
};
