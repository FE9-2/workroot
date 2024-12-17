"use client";

import { useSearchParams } from "next/navigation";
import PostsSection from "./components/sections/PostsSection";
import CommentsSection from "./components/sections/CommentsSection";
import ScrapsSection from "./components/sections/ScrapsSection";
import { userRoles } from "@/constants/userRoles";
import { useUser } from "@/hooks/queries/user/me/useUser";

export default function MyPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "posts";
  const { user } = useUser();
  const isApplicant = user?.role === userRoles.APPLICANT;

  const TabContent = {
    posts: <PostsSection />,
    comments: <CommentsSection />,
    ...(isApplicant && { scrap: <ScrapsSection /> }),
  }[currentTab];

  return TabContent;
}
