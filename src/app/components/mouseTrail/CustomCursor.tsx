"use client";

import React, { useState, useEffect } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 9999,
        pointerEvents: "none",
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
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0,0,255.98959,255.98959"
      width="32px"
      height="32px"
      fillRule="nonzero"
    >
      <g
        fill="rgba(34, 197, 94, 1)"
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
      >
        <g transform="translate(-48.38052,89.01673) rotate(-34) scale(16,16)">
          <path d="M7.5,0.62891l-4.46094,6.37109h1.80469l-2.82812,5h4.98438v2h1v-2h5l-0.44141,-0.75391l-2.49609,-4.24609h1.89844zM7.5,2.375l2.53906,3.625h-1.72656l2.9375,5h-7.51562l2.82031,-5h-1.59375z"></path>
        </g>
      </g>
    </svg>
  );
}
