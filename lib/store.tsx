import { create } from "zustand";

const useStore = create((set) => ({
  token: null,
  setToken: (token: any) => set({ token }),
  resetToken: () => set({ token: null }),
}));
export default useStore;
