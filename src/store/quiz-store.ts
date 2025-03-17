import { create } from "zustand";

type Store = {
  step: number;
  totalSteps: number;
  currentQuiz: any;
  quizzes: any[];
  canProceed: boolean;

  selectedOption: any | null;
  explanation: string;
  score: number;
  timeLeft: number;
  timerActive: boolean;

  // submission
  submissions: any[];

  // response from api
  //   correct_answers: number;
  //   total_quizzes: number;
  pass: boolean;
  score_percentage: number;

  setStep: (step: number) => void;
  setTotalSteps: (totalSteps: number) => void;
  setCurrentQuiz: (currentQuiz: any) => void;
  setQuizzes: (quizzes: any[]) => void;
  setCanProceed: (canProceed: boolean) => void;

  setSelectedOption: (selectedOption: any | null) => void;
  setExplanation: (explanation: string) => void;
  setScore: (score: number) => void;
  setTimeLeft: (timeLeft: number) => void;
  setTimerActive: (timerActive: boolean) => void;

  setSubmissions: (submissions: any[]) => void;
  setPass: (pass: boolean) => void;
  setScorePercentage: (score_percentage: number) => void;
};

export const useQuizStore = create<Store>()((set) => ({
  step: 0,
  totalSteps: 1,
  currentQuiz: null,
  quizzes: [],
  canProceed: false,

  selectedOption: null,
  explanation: "",
  score: 0,
  timeLeft: 30,
  timerActive: true,

  submissions: [],
  pass: false,
  score_percentage: 0,

  setStep: (step) => {
    set((state) => ({
      ...state,
      step,
    }));
  },
  setTotalSteps: (totalSteps) => {
    set((state) => ({
      ...state,
      totalSteps,
    }));
  },
  setCurrentQuiz: (currentQuiz) => {
    set((state) => ({
      ...state,
      currentQuiz,
    }));
  },
  setQuizzes: (quizzes) => {
    set((state) => ({
      ...state,
      quizzes,
    }));
  },
  setCanProceed: (canProceed) => {
    set((state) => ({
      ...state,
      canProceed,
    }));
  },

  setSelectedOption: (selectedOption) => {
    set((state) => ({
      ...state,
      selectedOption,
    }));
  },
  setExplanation: (explanation) => {
    set((state) => ({
      ...state,
      explanation,
    }));
  },
  setScore: (score) => {
    set((state) => ({
      ...state,
      score,
    }));
  },

  setTimeLeft: (timeLeft) => {
    set((state) => ({
      ...state,
      timeLeft,
    }));
  },
  setTimerActive: (timerActive) => {
    set((state) => ({
      ...state,
      timerActive,
    }));
  },
  setSubmissions: (submissions) => {
    set((state) => ({
      ...state,
      submissions,
    }));
  },
  setPass: (pass) => {
    set((state) => ({
      ...state,
      pass,
    }));
  },
  setScorePercentage: (score_percentage) => {
    set((state) => ({
      ...state,
      score_percentage,
    }));
  },
}));
