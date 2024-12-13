"use client";

import { cn } from "@/lib/tailwindUtil";
import React from "react";

export default function DotLoadingSpinner() {
  const dotStyle = "h-2 w-2 animate-bounce rounded-full ";
  return (
    <div className="flex justify-center py-2">
      <div className="flex items-center justify-center">
        <div className={cn(dotStyle, "bg-orange-200")} style={{ animationDelay: "0s" }}></div> {/* 연한 오렌지 */}
        <div className={cn(dotStyle, "ml-2 bg-green-200")} style={{ animationDelay: "0.2s" }}></div> {/* 연한 그린 */}
        <div className={cn(dotStyle, "ml-2 bg-blue-200")} style={{ animationDelay: "0.4s" }}></div> {/* 연한 블루 */}
      </div>
    </div>
  );
}
