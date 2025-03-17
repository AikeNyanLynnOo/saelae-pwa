import { create } from "zustand";

type Store = {
  lessonsLoading: boolean;
  lessons: any[];
  bookmarkLessons: any[];
  currentLesson: any;
  lesson: any;
  setLessonsLoading: (lessonsLoading: boolean) => void;
  setLessons: (lessons: any[]) => void;
  setBookmarkLessons: (bookmarkLessons: any[]) => void;
  setCurrentLesson: (currentLesson: any) => void;
  setLesson: (lesson: any) => void;
};

export const useLessonStore = create<Store>()((set) => ({
  lessonsLoading: false,
  lessons: [],
  bookmarkLessons: [],
  currentLesson: null,
  lesson: null,

  setLessonsLoading: (lessonsLoading) => {
    set((state) => ({
      ...state,
      lessonsLoading,
    }));
  },

  setLessons: (lessons) => {
    set((state) => ({
      ...state,
      lessons,
    }));
  },

  setBookmarkLessons: (bookmarkLessons) => {
    set((state) => ({
      ...state,
      bookmarkLessons,
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
