"use client";

import React from "react";
import TabMenu from "./TabMenu";
import SortSection from "./SortSection";

export default function FilterBar() {
  return (
    <div className="w-full bg-white">
      {/* 마이페이지 섹션 */}
      <div className="border-b border-gray-200">
        <div>
          <h1 className="py-4 text-xl font-bold text-gray-900 sm:py-6 sm:text-2xl">마이페이지</h1>
        </div>
      </div>

      {/* 탭 메뉴 섹션 */}
      <nav className="border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <TabMenu />
          <SortSection />
        </div>
      </nav>
    </div>
  );
}
