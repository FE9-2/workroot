import type { UserResponse } from "@/types/response/user";
import { create } from "zustand";

interface UserState {
  user: UserResponse | null;
  loading: boolean;
  setUser: (user: UserResponse | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));
