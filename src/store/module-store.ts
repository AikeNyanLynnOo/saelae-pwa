import { create } from "zustand";

// category
// "id": 2,
// "name": "တစ်နှစ်အောက်ကလေး",
// "created_at": "2025-03-03T07:01:31.000000Z",
// "updated_at": "2025-03-03T07:01:31.000000Z"

// module
// "id": 1,
// "title": "မွေးကင်းစကလေး ပြုစုစောင့်ရှောက်ခြင်း",
// "description": "ဆည်းလည်းလေးတို့တွေဟာ မွေးစအချိန်မှာ အရမ်းကိုနုနယ်လွန်းတာမို့ စနစ်တကျ ပြုစုစောင့်ရှောက်နည်းတွေကို လေ့လာရအောင်နော်။",
// "category": {
// "id": 1,
// "name": "မွေးကင်းစကလေး"
// },
// "progress_data": {
// "total_lessons": 1,
// "completed_lessons": 0,
// "completion_percentage": 0,
// "is_completed": false,
// "has_started": false
// },
// "created_at": "2025-03-03T07:02:54.000000Z",
// "updated_at": "2025-03-03T07:02:54.000000Z"

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
