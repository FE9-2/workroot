"use client";

import { useParams } from "next/navigation";
import { PostDetailSection } from "./sections/PostDetailSection";
import { CommentsSection } from "./sections/CommentsSection";

export default function PostDetailPage() {
  const { albatalkId } = useParams();

  // 에러 처리

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="mx-auto flex w-full max-w-[1480px] flex-col items-center px-4 lg:px-8">
        <PostDetailSection postId={albatalkId.toString()} />
        <CommentsSection postId={albatalkId.toString()} />
      </div>
    </main>
  );
}
