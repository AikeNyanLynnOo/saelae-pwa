import { create } from "zustand";

type Store = {
  loadingText: string;
  lang: string;
  setLoadingText: (loadingText: string) => void;
  setLanguage: (lang: string) => void;
};

export const useCommonStore = create<Store>()((set) => ({
  loadingText: "",
  lang: "mm", // Default value without accessing localStorage

  setLoadingText: (loadingText) => {
    set((state) => ({
      ...state,
      loadingText,
    }));
  },

  setLanguage: (lang) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
    }
    set((state) => ({
      ...state,
      lang,
    }));
  },
}));
