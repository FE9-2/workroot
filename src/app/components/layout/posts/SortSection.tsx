"use client";

import React from "react";
import FilterDropdown from "@/app/components/button/dropdown/FilterDropdown";
import { postSortOptions } from "@/constants/postOptions";
import { useRouter } from "next/navigation";

const SORT_OPTIONS = [
  { label: "최신순", value: postSortOptions.MOST_RECENT },
  { label: "댓글 많은순", value: postSortOptions.MOST_COMMENTED },
  { label: "좋아요 많은순", value: postSortOptions.MOST_LIKED },
];

interface SortSectionProps {
  pathname: string;
  searchParams: URLSearchParams;
}

export default function SortSection({ pathname, searchParams }: SortSectionProps) {
  const router = useRouter();
  const currentOrderBy = searchParams.get("orderBy") || postSortOptions.MOST_RECENT;

  const currentLabel = SORT_OPTIONS.find((opt) => opt.value === currentOrderBy)?.label || SORT_OPTIONS[0].label;

  const handleSortChange = (selected: string) => {
    const option = SORT_OPTIONS.find((opt) => opt.label === selected);
    if (option) {
      const params = new URLSearchParams(searchParams);
      params.set("orderBy", option.value);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <FilterDropdown
      options={SORT_OPTIONS.map((option) => option.label)}
      className="w-26 text-left text-xs lg:w-36 lg:text-lg"
      initialValue={currentLabel}
      onChange={handleSortChange}
    />
  );
}
