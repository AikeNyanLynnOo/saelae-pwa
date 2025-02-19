import { create } from "zustand";

type Store = {
  loadingText: string;

  setLoadingText: (loadingText: string) => void;
};

export const useCommonStore = create<Store>()((set) => ({
  loadingText: "",

  setLoadingText: (loadingText) => {
    set((state) => ({
      ...state,
      loadingText,
    }));
  },
}));
