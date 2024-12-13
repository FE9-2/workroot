"use client";

import React from "react";
import FilterDropdown from "@/app/components/button/dropdown/FilterDropdown";
import { formStatusOptions } from "@/constants/formOptions";
import { useRouter } from "next/navigation";

const APPLICANT_SORT_OPTIONS = [
  { label: "전체", value: "" },
  { label: "최신순", value: formStatusOptions.INTERVIEW_PENDING },
  { label: "시급높은순", value: formStatusOptions.INTERVIEW_COMPLETED },
  { label: "지원자 많은순", value: formStatusOptions.HIRED },
  { label: "스크랩 많은순", value: formStatusOptions.REJECTED },
];

interface ApplicantSortSectionProps {
  pathname: string;
  searchParams: URLSearchParams;
}

export default function ApplicantSortSection({ pathname, searchParams }: ApplicantSortSectionProps) {
  const router = useRouter();
  const currentOrderBy = searchParams.get("orderBy") || "";

  const currentLabel =
    APPLICANT_SORT_OPTIONS.find((opt) => opt.value === currentOrderBy)?.label || APPLICANT_SORT_OPTIONS[0].label;

  const handleSortChange = (selected: string) => {
    const option = APPLICANT_SORT_OPTIONS.find((opt) => opt.label === selected);
    if (option) {
      const params = new URLSearchParams(searchParams);
      params.set("orderBy", option.value);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <FilterDropdown
      options={APPLICANT_SORT_OPTIONS.map((option) => option.label)}
      className="!w-28 md:!w-40"
      initialValue={currentLabel}
      onChange={handleSortChange}
    />
  );
}
