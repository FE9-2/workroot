"use client";

import { useParams } from "next/navigation";
import { PostDetailSection } from "./sections/PostDetailSection";
import { CommentsSection } from "./sections/CommentsSection";

export default function PostDetailPage() {
  const { albatalkId } = useParams();

  return (
    <div className="mx-auto flex w-full min-w-[375px] flex-col items-center px-4 lg:w-[1024px] xl:w-[1480px]">
      <PostDetailSection postId={albatalkId.toString()} />
      <CommentsSection postId={albatalkId.toString()} />
    </div>
  );
}
