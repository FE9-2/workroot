"use client";

import debounce from "@/utils/debounce";
import { useEffect, useState } from "react";

const BREAKPOINTS = {
  TABLET: 768,
  DESKTOP: 1024,
  DESKTOP_LARGE: 1440,
};

const useWidth = () => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(window.innerWidth);

    const handleResize = debounce(() => {
      setWidth(window.innerWidth);
    }, 100);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = width < BREAKPOINTS.TABLET;
  const isTablet = width >= BREAKPOINTS.TABLET && width < BREAKPOINTS.DESKTOP;
  const isDesktop = width >= BREAKPOINTS.DESKTOP && width < BREAKPOINTS.DESKTOP_LARGE;
  const isDesktopLarge = width >= BREAKPOINTS.DESKTOP_LARGE;

  return { isMobile, isTablet, isDesktop, isDesktopLarge, width };
};

export default useWidth;
