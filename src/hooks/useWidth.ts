"use client";

import debounce from "@/utils/debounce";
import { useEffect, useState } from "react";

const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 1024,
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

  const isMobile = width < BREAKPOINTS.MOBILE;
  const isTablet = width >= BREAKPOINTS.MOBILE && width < BREAKPOINTS.TABLET;
  const isDesktop = width >= BREAKPOINTS.TABLET;

  return { isMobile, isTablet, isDesktop, width };
};

export default useWidth;
