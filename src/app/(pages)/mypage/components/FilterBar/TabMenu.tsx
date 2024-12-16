"use client";

import React from "react";
import { cn } from "@/lib/tailwindUtil";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { APPLICANT_TABS, OWNER_TABS } from "./constants";
import { useUser } from "@/hooks/queries/user/me/useUser";
import { userRoles } from "@/constants/userRoles";

export default function TabMenu() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "posts";
  const { user } = useUser();
  const isOwner = user?.role === userRoles.OWNER;

  const createQueryString = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);

    if (tab !== "scrap") {
      params.delete("isPublic");
      params.delete("isRecruiting");
    }

    return params.toString();
  };

  const getLinkClassName = (value: string) => {
    return cn(
      "py-4 py-2 text-sm font-medium transition-colors sm:text-base",
      "hover:text-grayscale-900",
      currentTab === value ? "border-b-2 border-primary-orange-300 text-grayscale-900" : "text-grayscale-500"
    );
  };

  return (
    <div className="flex gap-4 lg:gap-8">
      {isOwner
        ? OWNER_TABS.map((tab) => (
            <Link
              key={tab.value}
              href={`/mypage?${createQueryString(tab.value)}`}
              className={getLinkClassName(tab.value)}
            >
              {tab.name}
            </Link>
          ))
        : APPLICANT_TABS.map((tab) => (
            <Link
              key={tab.value}
              href={`/mypage?${createQueryString(tab.value)}`}
              className={getLinkClassName(tab.value)}
            >
              {tab.name}
            </Link>
          ))}
    </div>
  );
}
