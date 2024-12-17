import React from "react";

export const SkeletonRow: React.FC = () => (
  <div className="grid animate-pulse grid-cols-[1fr_2fr_1fr_1fr] border-b border-line-100 px-6 py-4">
    {[1, 2, 3, 4].map((index) => (
      <div
        key={index}
        className={`h-4 ${index === 1 || index === 3 ? "w-2/5" : "w-1/4"} rounded bg-grayscale-200`}
      ></div>
    ))}
  </div>
);
