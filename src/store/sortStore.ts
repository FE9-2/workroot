import { create } from "zustand";
import { postSortOptions } from "@/constants/postOptions";
import { formSortOptions } from "@/constants/formOptions";

type PageType = "posts" | "comments" | "scrap";

interface SortState {
  orderBy: {
    posts: string;
    comments: string;
    scrap: string;
  };
  setOrderBy: (pageType: PageType, value: string) => void;
}

export const useSortStore = create<SortState>((set) => ({
  orderBy: {
    posts: postSortOptions.MOST_RECENT,
    comments: postSortOptions.MOST_RECENT,
    scrap: formSortOptions.MOST_RECENT,
  },
  setOrderBy: (pageType, value) =>
    set((state) => ({
      orderBy: {
        ...state.orderBy,
        [pageType]: value,
      },
    })),
}));
