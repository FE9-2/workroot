"use client";

import React from "react";
import TabMenu from "./TabMenu";
import SortSection from "./SortSection";
import Button from "@/app/components/button/default/Button";
import KebabDropdown from "@/app/components/button/dropdown/KebabDropdown";

export default function FilterBar() {
  const handleEditProfile = () => {
    // 내 정보 수정 처리
  };

  const handleChangePassword = () => {
    // 비밀번호 변경 처리
  };

  const dropdownOptions = [
    { label: "내 정보 수정", onClick: handleEditProfile },
    { label: "비밀번호 변경", onClick: handleChangePassword },
  ];

  return (
    <div className="w-full bg-white">
      {/* 마이페이지 섹션 */}
      <div className="border-b border-grayscale-200">
        <div className="flex items-center justify-between">
          <h1 className="text-grayscale-900 py-4 text-xl font-bold sm:py-6 sm:text-2xl">마이페이지</h1>
          {/* sm, md에서는 케밥 메뉴, lg 이상에서는 버튼 */}
          <div>
            <div className="hidden lg:flex lg:gap-2">
              <Button variant="solid" width="sm" onClick={handleEditProfile}>
                내 정보 수정
              </Button>
              <Button variant="outlined" width="sm" onClick={handleChangePassword}>
                비밀번호 변경
              </Button>
            </div>
            <div className="lg:hidden">
              <KebabDropdown options={dropdownOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* 탭 메뉴 섹션 */}
      <nav className="border-b border-grayscale-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <TabMenu />
          <SortSection />
        </div>
      </nav>
    </div>
  );
}
