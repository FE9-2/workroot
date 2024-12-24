"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
}

export default function TypewriterText({ text, className = "" }: TypewriterTextProps) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    });
  }, [controls]);

  return (
    <motion.span className={className} initial={{ opacity: 0 }} animate={controls}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: index * 0.03 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
