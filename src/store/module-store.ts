import { create } from "zustand";

type Store = {
  categories: any[];
  modules: any[];
  currentModule: any;
  currentCategory: string;
  setCategories: (categories: any[]) => void;
  setModules: (modules: any[]) => void;
  setCurrentModule: (currentModule: any) => void;
  setCurrentCategory: (currentCategory: any) => void;
};

export const useModuleStore = create<Store>()((set) => ({
  categories: [],
  modules: [],
  currentModule: null,
  currentCategory: "",

  setCategories: (categories) => {
    set((state) => ({
      ...state,
      categories,
    }));
  },

  setModules: (modules) => {
    set((state) => ({
      ...state,
      modules,
    }));
  },
  setCurrentModule: (currentModule) => {
    set((state) => ({
      ...state,
      currentModule,
    }));
  },
  setCurrentCategory: (currentCategory) => {
    set((state) => ({
      ...state,
      currentCategory,
    }));
  },
}));
