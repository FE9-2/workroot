import { motion } from "framer-motion";
import React from "react";

// 유틸리티 함수들
const getLeafSize = (index: number) => {
  if (index % 3 === 2) {
    return {
      height: "17px",
      width: "23px",
      beforeTop: "12px",
      beforeRight: "1px",
      beforeHeight: "4px",
      beforeWidth: "4px",
      afterHeight: "10px",
      afterWidth: "2px",
      afterLeft: "8px",
      afterTop: "1px",
    };
  } else if (index % 2 === 1) {
    return {
      height: "11px",
      width: "16px",
      beforeTop: "7px",
      beforeRight: "0px",
      beforeHeight: "3px",
      beforeWidth: "4px",
      afterHeight: "6px",
      afterWidth: "2px",
      afterLeft: "5px",
      afterTop: "1px",
    };
  }
  return {
    height: "23px",
    width: "30px",
    beforeTop: "17px",
    beforeRight: "1px",
    beforeHeight: "5px",
    beforeWidth: "7px",
    afterHeight: "17px",
    afterWidth: "2px",
    afterLeft: "12px",
    afterTop: "0px",
  };
};

const getLeafGradient = (index: number) => {
  if (index % 4 === 1) {
    return "linear-gradient(to bottom right, #990, #564500)";
  } else if (index % 2 === 0) {
    return "linear-gradient(to bottom right, #5e9900, #2b5600)";
  }
  return "linear-gradient(to bottom right, #309900, #005600)";
};

const getLeafDelay = (index: number) => {
  const delays = [1.9, 3.9, 2.3, 4.4, 5, 3.5, 2.8, 1.5, 3.3, 2.5, 1.2, 4.1, 1, 4.7, 3];
  return delays[index % delays.length];
};

const LeafAnimation: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <motion.div
        className="absolute -top-12 w-full text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(15)].map((_, i) => (
          <motion.i
            key={i}
            className={`relative inline-block opacity-70 ${i % 3 === 1 ? "opacity-50" : ""} ${
              i % 3 === 2 ? "opacity-30" : ""
            }`}
            style={{
              height: getLeafSize(i).height,
              width: getLeafSize(i).width,
              background: getLeafGradient(i),
              borderRadius: "5% 40% 70%",
              boxShadow: "inset 0px 0px 1px #222",
              border: "1px solid #333",
              transform: "rotate(180deg)",
            }}
            animate={{
              x: [300, -350],
              y: [0, 700],
              rotate: [0, 90],
              opacity: [null, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: getLeafDelay(i),
              ease: "easeInOut",
            }}
          >
            <motion.span
              className="absolute"
              style={{
                content: '""',
                top: getLeafSize(i).beforeTop,
                right: getLeafSize(i).beforeRight,
                height: getLeafSize(i).beforeHeight,
                width: getLeafSize(i).beforeWidth,
                transform: "rotate(49deg)",
                borderRadius: "0% 15% 15% 0%",
                border: "1px solid #222",
                borderLeft: "none",
                background: "linear-gradient(to right, rgba(0,100,0,1), #005600)",
              }}
            />
            <motion.span
              className="absolute"
              style={{
                content: '""',
                height: getLeafSize(i).afterHeight,
                width: getLeafSize(i).afterWidth,
                background: "linear-gradient(to right, rgba(0,0,0,.15), rgba(0,0,0,0))",
                transform: "rotate(125deg)",
                left: getLeafSize(i).afterLeft,
                top: getLeafSize(i).afterTop,
                borderRadius: "50%",
              }}
            />
          </motion.i>
        ))}
      </motion.div>
    </div>
  );
};

export default LeafAnimation;
