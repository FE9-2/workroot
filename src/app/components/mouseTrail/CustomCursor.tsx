"use client";

import React, { useState, useEffect } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Lightbox 요소 감시
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const lightbox = document.querySelector('[role="dialog"]');
          if (lightbox) {
            setIsVisible(true);
          }
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("mousemove", updatePosition);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  return (
    <div
      data-custom-cursor
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 99999,
        pointerEvents: "none",
        opacity: isVisible ? 1 : 0,
        transform: "translate(-50%, -50%)",
      }}
    >
      <TreeSVG />
    </div>
  );
}

function TreeSVG() {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="20.000000pt"
      height="20.000000pt"
      viewBox="0 0 96.000000 96.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)" fill="rgba(34, 197, 94, 1)" stroke="none">
        <path
          d="M24 925 c-7 -18 0 -542 8 -550 3 -4 25 7 49 24 23 17 45 31 49 31 4
0 11 -37 14 -82 12 -134 34 -320 40 -325 3 -3 66 38 140 91 75 53 142 99 150
102 9 4 27 -14 53 -50 21 -30 41 -55 44 -56 4 0 18 9 33 21 l26 20 -42 60
c-25 36 -38 62 -32 68 5 4 71 52 147 105 125 90 154 116 127 116 -10 0 -293
125 -346 153 l-28 14 53 38 c29 21 49 41 44 45 -4 4 -89 36 -188 70 -99 34
-215 75 -258 90 -57 20 -80 24 -83 15z m226 -145 c78 -27 144 -51 147 -54 2
-2 -16 -19 -41 -36 -25 -18 -43 -36 -41 -40 2 -4 88 -44 190 -90 102 -46 185
-86 185 -89 -1 -3 -101 -77 -223 -164 l-222 -157 -6 37 c-4 21 -9 63 -12 93
-25 236 -31 280 -42 280 -6 0 -26 -11 -45 -25 -19 -14 -35 -25 -37 -25 -2 0
-3 72 -3 160 0 88 2 160 4 160 1 0 67 -22 146 -50z"
        />
      </g>
    </svg>
  );
}
