import { create } from "zustand";
import { postSortOptions } from "@/constants/postOptions";
import { formSortOptions } from "@/constants/formOptions";

type MyPageTabType = "posts" | "comments" | "scrap";

interface MySortState {
  orderBy: {
    posts: string;
    comments: string;
    scrap: string;
  };
  setOrderBy: (tabType: MyPageTabType, value: string) => void;
}

export const useMySortStore = create<MySortState>((set) => ({
  orderBy: {
    posts: postSortOptions.MOST_RECENT,
    comments: postSortOptions.MOST_RECENT,
    scrap: formSortOptions.MOST_RECENT,
  },
  setOrderBy: (tabType, value) =>
    set((state) => ({
      orderBy: {
        ...state.orderBy,
        [tabType]: value,
      },
    })),
}));
