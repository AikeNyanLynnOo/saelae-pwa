import { create } from "zustand";

type Store = {
  phoneNumber: string;
  countryCode: string;
  iso2Code: string;
  inputValue: string;
  currentUser: any;

  setPhoneNumber: (phoneNumber: string) => void;
  setCountryCode: (countryCode: string) => void;
  setIso2Code: (iso2Code: string) => void;
  setInputValue: (inputValue: string) => void;
  setCurrentUser: (currentUser: any) => void;
};

export const useAuthStore = create<Store>()((set) => ({
  phoneNumber: "",
  countryCode: "",
  iso2Code: "",
  inputValue: "",
  currentUser: null,

  setPhoneNumber: (phoneNumber) => {
    set((state) => ({
      ...state,
      phoneNumber,
    }));
  },
  setCountryCode: (countryCode) => {
    set((state) => ({
      ...state,
      countryCode,
    }));
  },
  setIso2Code: (iso2Code) => {
    set((state) => ({
      ...state,
      iso2Code,
    }));
  },
  setInputValue: (inputValue) => {
    set((state) => ({
      ...state,
      inputValue,
    }));
  },
  setCurrentUser: (currentUser) => {
    set((state) => ({
      ...state,
      currentUser,
    }));
  },
}));
