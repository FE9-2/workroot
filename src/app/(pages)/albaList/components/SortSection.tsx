"use client";

import React, { useState } from "react";
import FilterDropdown from "@/app/components/button/dropdown/FilterDropdown";
import { formSortOptions } from "@/constants/formOptions";

type FormSortOption = (typeof formSortOptions)[keyof typeof formSortOptions];

const SORT_OPTIONS = [
  { label: "최신순", value: formSortOptions.MOST_RECENT },
  { label: "시급높은순", value: formSortOptions.HIGHEST_WAGE },
  { label: "지원자 많은순", value: formSortOptions.MOST_APPLIED },
  { label: "스크랩 많은순", value: formSortOptions.MOST_SCRAPPED },
];

export default function SortSection() {
  const [currentSort, setCurrentSort] = useState<FormSortOption>(formSortOptions.MOST_RECENT);

  const currentLabel = SORT_OPTIONS.find((opt) => opt.value === currentSort)?.label || SORT_OPTIONS[0].label;

  const handleSortChange = (selected: string) => {
    const option = SORT_OPTIONS.find((opt) => opt.label === selected);
    if (option) {
      setCurrentSort(option.value);
    }
  };

  return (
    <FilterDropdown
      options={SORT_OPTIONS.map((option) => option.label)}
      className="!w-28 md:!w-40"
      initialValue={currentLabel}
      onChange={handleSortChange}
    />
  );
}
