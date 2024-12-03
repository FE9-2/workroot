"use client";

import { useSearchParams } from "next/navigation";
import PostsSection from "./components/sections/PostsSection";
import CommentsSection from "./components/sections/CommentsSection";
import ScrapsSection from "./components/sections/ScrapsSection";

export default function MyPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "posts";

  const TabContent = {
    posts: <PostsSection />,
    comments: <CommentsSection />,
    scrap: <ScrapsSection />,
  }[currentTab];

  return TabContent;
}
