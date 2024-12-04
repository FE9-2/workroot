"use client";

import { useSearchParams } from "next/navigation";
import PostsSection from "./sections/PostsSection";
import CommentsSection from "./sections/CommentsSection";
import ScrapsSection from "./sections/ScrapsSection";

export default function MyPageContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "posts";

  const TabContent = {
    posts: <PostsSection />,
    comments: <CommentsSection />,
    scrap: <ScrapsSection />,
  }[currentTab];

  return TabContent;
}
