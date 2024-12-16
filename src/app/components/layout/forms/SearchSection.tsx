"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SearchInput from "@/app/components/input/text/SearchInput";
import Button from "../../button/default/Button";

export default function SearchSection({ pathname }: { pathname: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (keyword.trim()) {
      params.set("keyword", keyword);
    } else {
      params.delete("keyword");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mx-auto flex items-center gap-4">
        <SearchInput
          value={keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
          className="text:lg lg:text:xl h-[36px] w-full border-none bg-background-200 hover:bg-background-300 md:h-[48px]"
        />
        <Button type="submit" variant="solid" color="lime" width="xs" height="sm">
          검색
        </Button>
      </div>
    </form>
  );
}
