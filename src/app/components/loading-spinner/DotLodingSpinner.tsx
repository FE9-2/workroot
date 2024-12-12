"use client";

import React from "react";

export default function DotLoadingSpinner() {
  return (
    <div className="flex justify-center py-2">
      <div className="flex items-center justify-center">
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-primary-orange-300"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="ml-2 h-2 w-2 animate-bounce rounded-full bg-primary-orange-300"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="ml-2 h-2 w-2 animate-bounce rounded-full bg-primary-orange-300"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
}
