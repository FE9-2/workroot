"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailPosition {
  x: number;
  y: number;
  id: string;
}

export default function MouseTrail() {
  const [trail, setTrail] = useState<TrailPosition[]>([]);
  const [lastPosition, setLastPosition] = useState<TrailPosition | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const uniqueId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newPosition = { x: e.clientX, y: e.clientY, id: uniqueId };

      if (lastPosition) {
        const distance = Math.sqrt(
          Math.pow(newPosition.x - lastPosition.x, 2) + Math.pow(newPosition.y - lastPosition.y, 2)
        );

        if (distance > 50) {
          setTrail((prevTrail) => [newPosition, ...prevTrail.slice(0, 9)]);
          setLastPosition(newPosition);
        }
      } else {
        setTrail([newPosition]);
        setLastPosition(newPosition);
      }
    },
    [lastPosition]
  );

  useEffect(() => {
    const options = { passive: true };
    window.addEventListener("mousemove", handleMouseMove, options.passive);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove, options.passive);
    };
  }, [handleMouseMove]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100000] overflow-hidden">
      <AnimatePresence>
        {trail.map((position, index) => (
          <motion.div
            key={position.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0.5 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: position.x,
              top: position.y,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          >
            <TrailDot opacity={1 - index * 0.1} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function TrailDot({ opacity = 1 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16px" height="16px">
      <path fill="#4e7ab5" d="M7 0H8V15H7z" />
      <path
        fill="#4e7ab5"
        d="M7.5 3.5L5.6 1.6 6.3.9 7.5 2.1 8.7.9 9.4 1.6zM8.7 14.1L7.5 12.9 6.3 14.1 5.6 13.4 7.5 11.5 9.4 13.4z"
      />
      <path fill="#4e7ab5" d="M7 0H8V15H7z" transform="rotate(-60 7.5 7.5)" />
      <path
        fill="#4e7ab5"
        d="M1.4 6.2L1.1 5.2 2.8 4.8 2.4 3.1 3.3 2.9 4 5.5zM11.7 12.1L11 9.5 13.6 8.8 13.9 9.8 12.2 10.2 12.6 11.9z"
      />
      <path fill="#4e7ab5" d="M0 7H15V8H0z" transform="rotate(-30.021 7.5 7.5)" />
      <path fill="#4e7ab5" d="M7 3.1H8V11.9H7z" transform="rotate(-30 7.5 7.5)" />
      <path fill="#4e7ab5" d="M3.1 7H11.9V8H3.1z" />
      <path fill="#4e7ab5" d="M3.1 7H11.9V8H3.1z" transform="rotate(-60.007 7.5 7.5)" />
      <path
        fill="#4e7ab5"
        d="M3.3 12.1L2.4 11.9 2.8 10.2 1.1 9.8 1.4 8.8 4 9.5zM13.6 6.2L11 5.5 11.7 2.9 12.6 3.1 12.2 4.8 13.9 5.2z"
      />
    </svg>
  );
}
