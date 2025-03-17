import { create } from "zustand";

type Store = {
  currentBaby: any;
  setCurrentBaby: (currentBaby: any) => void;
};

export const useBabyStore = create<Store>()((set) => ({
  currentBaby: null,
  setCurrentBaby: (currentBaby) => {
    set((state) => ({
      ...state,
      currentBaby,
    }));
  },
}));
