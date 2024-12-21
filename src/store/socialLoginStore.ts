import { create } from "zustand";

interface SocialLoginState {
  email: string;
  nickname: string;
  provider: string;
  setLoginInfo: (email: string, nickname: string, provider: string) => void;
  reset: () => void;
}

export const useSocialLoginStore = create<SocialLoginState>((set) => ({
  email: "",
  nickname: "",
  provider: "",
  setLoginInfo: (email: string, nickname: string, provider: string) => set({ email, nickname, provider }),
  reset: () => set({ email: "", nickname: "", provider: "" }),
}));
