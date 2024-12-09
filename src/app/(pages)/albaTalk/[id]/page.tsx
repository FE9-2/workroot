"use client";
import { useRouter } from "next/router";

const DetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>글 상세 페이지 - ID: {id}</div>;
};

export default DetailPage;
