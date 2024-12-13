"use client";

import TabMenu from "./TabMenu";
import SortSection from "./SortSection";
import Button from "@/app/components/button/default/Button";
import KebabDropdown from "@/app/components/button/dropdown/KebabDropdown";
import { userRoles } from "@/constants/userRoles";
import useModalStore from "@/store/modalStore";
import { useUser } from "@/hooks/queries/user/me/useUser";

export default function FilterBar() {
  const { user, isLoading } = useUser();
  const { openModal } = useModalStore();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return null;
  }

  const handleEditProfile = () => {
    if (user.role === userRoles.APPLICANT) {
      openModal("editMyProfile", {
        fields: ["이름", "닉네임", "전화번호"],
        onSubmit: () => {},
      });
    } else if (user.role === userRoles.OWNER) {
      openModal("editOwnerProfile", {
        fields: ["닉네임", "가게 이름", "가게 전화번호", "사장님 전화번호", "가게 위치"],
        onSubmit: () => {},
      });
    }
  };

  const handleChangePassword = () => {
    openModal("changePassword", {
      fields: ["현재 비밀번호", "새 비밀번호", "새 비밀번호 확인"],
      onSubmit: () => {},
    });
  };

  const dropdownOptions = [
    { label: "내 정보 수정", onClick: handleEditProfile },
    { label: "비밀번호 변경", onClick: handleChangePassword },
  ];

  return (
    <div className="w-full bg-white">
      {/* 마이페이지 섹션 */}
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

      {/* 탭 메뉴 섹션 */}
      <nav className="border-b border-line-100">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between py-4">
          <TabMenu />
          <div className="ml-auto">
            <SortSection />
          </div>
        </div>
      </nav>
    </div>
  );
}
