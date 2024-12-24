"use client";

import { useSearchParams } from "next/navigation";
import PostsSection from "./components/sections/PostsSection";
import CommentsSection from "./components/sections/CommentsSection";
import ScrapsSection from "./components/sections/ScrapsSection";
import { userRoles } from "@/constants/userRoles";
import { useUser } from "@/hooks/queries/user/me/useUser";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function MyPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "posts";
  const router = useRouter();
  const { user } = useUser();
  const isApplicant = user?.role === userRoles.APPLICANT;

  const TabContent = {
    posts: <PostsSection />,
    comments: <CommentsSection />,
    ...(isApplicant && { scrap: <ScrapsSection /> }),
  }[currentTab];

  if (!user) {
    toast.error("로그인이 필요한 페이지입니다.");
    router.push("/login");
  }

  return TabContent;
}
