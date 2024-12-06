import { create } from "zustand";

type FilterType = "isPublic" | "isRecruiting";

interface FilterState {
  filterBy: {
    isPublic: boolean;
    isRecruiting: boolean;
  };
  setFilterBy: (filterType: FilterType, value: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filterBy: {
    isPublic: true,
    isRecruiting: true,
  },
  setFilterBy: (filterType, value) =>
    set((state) => ({
      filterBy: {
        ...state.filterBy,
        [filterType]: value,
      },
    })),
}));
