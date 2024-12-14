import { postSortOptions } from "@/constants/postOptions";
import { formSortOptions } from "@/constants/formOptions";

export const TABS = [
  { name: "내가 쓴 글", value: "posts" },
  { name: "내가 쓴 댓글", value: "comments" },
  { name: "스크랩", value: "scrap" },
] as const;

export const SORT_OPTIONS = {
  posts: [
    { label: "최신순", value: postSortOptions.MOST_RECENT },
    { label: "댓글순", value: postSortOptions.MOST_COMMENTED },
    { label: "좋아요순", value: postSortOptions.MOST_LIKED },
  ],
  comments: [{ label: "최신순", value: postSortOptions.MOST_RECENT }],
  scrap: [
    { label: "최신순", value: formSortOptions.MOST_RECENT },
    { label: "시급높은순", value: formSortOptions.HIGHEST_WAGE },
    { label: "지원자 많은순", value: formSortOptions.MOST_APPLIED },
    { label: "스크랩 많은순", value: formSortOptions.MOST_SCRAPPED },
  ],
} as const;

export const DEFAULT_SORT_VALUES = {
  posts: postSortOptions.MOST_RECENT,
  comments: postSortOptions.MOST_RECENT,
  scrap: formSortOptions.MOST_RECENT,
} as const;
