"use client";

import React from "react";
import { cn } from "@/lib/tailwindUtil";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { TABS } from "./constants";

export default function TabMenu() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "posts";

  const createQueryString = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    return params.toString();
  };

  const getLinkClassName = (value: string) => {
    return cn(
      "py-4 py-2 text-sm font-medium transition-colors sm:text-base",
      "hover:text-gray-900",
      currentTab === value ? "border-b-2 border-primary-orange-300 text-gray-900" : "text-gray-500"
    );
  };

  return (
    <div className="flex space-x-4 sm:space-x-8">
      {TABS.map((tab) => (
        <Link key={tab.value} href={`/mypage?${createQueryString(tab.value)}`} className={getLinkClassName(tab.value)}>
          {tab.name}
        </Link>
      ))}
    </div>
  );
}
