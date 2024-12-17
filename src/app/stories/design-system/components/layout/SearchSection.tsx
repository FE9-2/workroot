"use client";

import { useState } from "react";
import SearchInput from "@/app/components/input/text/SearchInput";

export default function SearchSection() {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 스토리북에서는 실제 검색 기능을 수행하지 않습니다
    console.log("Search keyword:", keyword);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mx-auto flex items-center justify-between gap-4">
        <div className="w-[270px] md:w-[500px] lg:w-[700px] xl:w-[900px] 2xl:w-[1100px]">
          <SearchInput
            value={keyword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
            className="h-10 w-full bg-background-200 hover:bg-background-300"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-[#FFB800] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#FFA800] md:px-8 md:text-base lg:px-12 lg:text-lg xl:px-16 xl:text-xl"
        >
          검색
        </button>
      </div>
    </form>
  );
}
