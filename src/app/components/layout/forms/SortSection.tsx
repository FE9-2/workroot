"use client";

import React from "react";
import FilterDropdown from "@/app/components/button/dropdown/FilterDropdown";
import { formSortOptions } from "@/constants/formOptions";
import { useRouter } from "next/navigation";

const SORT_OPTIONS = [
  { label: "최신순", value: formSortOptions.MOST_RECENT },
  { label: "시급높은순", value: formSortOptions.HIGHEST_WAGE },
  { label: "지원자 많은순", value: formSortOptions.MOST_APPLIED },
  { label: "스크랩 많은순", value: formSortOptions.MOST_SCRAPPED },
];

interface SortSectionProps {
  pathname: string;
  searchParams: URLSearchParams;
}

export default function SortSection({ pathname, searchParams }: SortSectionProps) {
  const router = useRouter();
  const currentOrderBy = searchParams.get("orderBy") || formSortOptions.MOST_RECENT;

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
      className="w-26 text-left text-xs md:w-36 md:text-lg"
      initialValue={currentLabel}
      onChange={handleSortChange}
    />
  );
}
