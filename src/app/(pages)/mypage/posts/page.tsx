"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function PostsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/users/me/posts");
        setPosts(response.data.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        toast.error("게시글을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <p className="text-gray-500">아직 작성한 글이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      {/* 게시글 목록 컴포넌트 추가 예정 */}
      <div>게시글 목록이 표시될 영역</div>
    </>
  );
}
