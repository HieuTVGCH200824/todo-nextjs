import { create } from "zustand";

export interface token {
  token: string;
  setToken: (token: string) => void;
  resetToken: () => void;
}

const useStore = create<token>()((set) => ({
  token: "",
  setToken: (token: string) => set({ token: token }),
  resetToken: () => set({ token: "" }),
}));
export { useStore };
