"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useMySortStore } from "@/store/mySortStore";
import FilterDropdown from "@/app/components/button/dropdown/FilterDropdown";
import { SORT_OPTIONS, DEFAULT_SORT_VALUES } from "./constants";

export default function SortSection() {
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get("tab") || "posts") as keyof typeof SORT_OPTIONS;
  const { orderBy, setOrderBy } = useMySortStore();
  const options = SORT_OPTIONS[currentTab];
  const currentLabel = options.find((opt) => opt.value === orderBy[currentTab])?.label || options[0].label;
  const isReadOnly = currentTab === "comments";

  useEffect(() => {
    setOrderBy(currentTab, DEFAULT_SORT_VALUES[currentTab]);
  }, [currentTab, setOrderBy]);

  const handleSortChange = (selected: string) => {
    const option = options.find((opt) => opt.label === selected);
    if (option) {
      setOrderBy(currentTab, option.value);
    }
  };

  return (
    <FilterDropdown
      options={options.map((option) => option.label)}
      className="!w-28 border-transparent md:!w-40"
      initialValue={currentLabel}
      onChange={handleSortChange}
      readOnly={isReadOnly}
    />
  );
}
