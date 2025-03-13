import { create } from "zustand";

type Store = {
  lessons: any[];
  currentLesson: any;
  lesson: any;
  setLessons: (lessons: any[]) => void;
  setCurrentLesson: (currentLesson: any) => void;
  setLesson: (lesson: any) => void;
};

export const useLessonStore = create<Store>()((set) => ({
  lessons: [],
  currentLesson: null,
  lesson: null,

  setLessons: (lessons) => {
    set((state) => ({
      ...state,
      lessons,
    }));
  },

  setCurrentLesson: (currentLesson) => {
    set((state) => ({
      ...state,
      currentLesson,
    }));
  },

  setLesson: (lesson) => {
    set((state) => ({
      ...state,
      lesson,
    }));
  },
}));
