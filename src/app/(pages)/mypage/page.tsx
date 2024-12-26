"use client";

import { useSearchParams } from "next/navigation";
import PostsSection from "./components/sections/PostsSection";
import CommentsSection from "./components/sections/CommentsSection";
import ScrapsSection from "./components/sections/ScrapsSection";
import { userRoles } from "@/constants/userRoles";
import { useUser } from "@/hooks/queries/user/me/useUser";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";

export default function MyPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "posts";
  const { user, isLoading } = useUser();
  const isApplicant = user?.role === userRoles.APPLICANT;

  const TabContent = {
    posts: <PostsSection />,
    comments: <CommentsSection />,
    ...(isApplicant && { scrap: <ScrapsSection /> }),
  }[currentTab];

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <DotLoadingSpinner />
      </div>
    );
  }

  if (!user) return null;

  return TabContent;
}
