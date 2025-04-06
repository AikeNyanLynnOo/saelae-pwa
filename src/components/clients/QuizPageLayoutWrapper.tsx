"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useTranslate } from "../hooks/use-translate";
import { useEffect, useMemo, useState } from "react";
import { QuizPageLayout } from "./QuizPageLayout";
import { QuizStepper } from "../atoms/forms/QuizStepper";
import { PageHeader } from "../atoms/PageHeader";
import { getUserProfile } from "@/utils/userAPIFunctions";
import { useAuthStore } from "@/store/auth-store";
import { parseCookies } from "nookies";
import {
  getLessonQuiz,
  getModuleQuiz,
  submitLessonQuiz,
  submitModuleQuiz,
} from "@/utils/quizApiFunctions";
import { useQuizStore } from "@/store/quiz-store";

interface QuizPageLayoutWrapperProps {
  cookies?: any;
}

export const QuizPageLayoutWrapper = ({
  cookies,
}: QuizPageLayoutWrapperProps) => {
  const clientCookies = parseCookies();
  const { setCurrentUser } = useAuthStore();
  const {
    quizState,
    setQuizState,
    setQuizzes,
    step,
    totalSteps,
    setStep,
    setTotalSteps,
    canProceed,
    setSelectedOption,
    setExplanation,
    setScore,
    setTimeLeft,
    setTimerActive,
    setCanProceed,

    // submission
    submissions,
    setSubmissions,
    setPass,
    setScorePercentage,
  } = useQuizStore();

  const { messages, isLoading } = useTranslate();
  const { common } = messages;
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const module_id = searchParams.get("module_id") || "";
  // fetchUser
  // checkIsValid
  useEffect(() => {
    getUserProfile({ cookies: clientCookies }).then(
      ({ status, statusText, success, message, data, loading, error }) => {
        if (success && data) {
          setCurrentUser((data && data.profile) || null);
        } else {
          router.push("/welcome?session_expired=true");
        }
      }
    );
  }, []);

  // fetch quizzes
  useEffect(() => {
    if (params && params.lesson_id) {
      getLessonQuiz({
        cookies: clientCookies,
        module_id,

        lesson_id: params.lesson_id as string,
      }).then(
        ({ status, statusText, success, message, data, loading, error }) => {
          if (success && data) {
            setQuizzes((data && data.length > 0 && data) || []);
            setStep(0);
            setTotalSteps(data.length);
          } else {
            setQuizzes([]);
            setStep(0);
            setTotalSteps(1);
          }
        }
      );
    } else {
      getModuleQuiz({
        cookies: clientCookies,
        module_id,
      }).then(
        ({ status, statusText, success, message, data, loading, error }) => {
          if (success && data) {
            setQuizzes((data && data.length > 0 && data) || []);
            setStep(0);
            setTotalSteps(data.length);
          } else {
            setQuizzes([]);
            setStep(0);
            setTotalSteps(1);
          }
        }
      );
    }
  }, []);

  const showSecondaryButton = useMemo(
    () =>
      params && params.lesson_id && quizState === "complete" ? true : false,
    [params, quizState]
  );

  const handleNext = () => {
    setSelectedOption(null);
    setExplanation("");

    setTimerActive(true);

    if (quizState === "complete") {
      setQuizState("question");
      setSelectedOption(null);
      setExplanation("");
      setTimeLeft(30);
      setTimerActive(true);
      setScore(0);
      setStep(0);
      setSubmissions([]);
      setCanProceed(false);
      router.push("/");
      return;
    }
    if (step === totalSteps - 1) {
      if (params && params.lesson_id) {
        submitLessonQuiz({
          cookies: clientCookies,
          module_id,
          lesson_id: params.lesson_id as string,
          submissions,
        }).then(
          ({ status, statusText, success, message, data, loading, error }) => {
            if (success && data) {
              setQuizState("complete");
              const { pass, score_percentage } = data;
              setPass(pass);
              setScorePercentage(score_percentage);
            }
          }
        );
      } else {
        submitModuleQuiz({
          cookies: clientCookies,
          module_id,
          submissions,
        }).then(
          ({ status, statusText, success, message, data, loading, error }) => {
            if (success && data) {
              setQuizState("complete");
              const { pass, score_percentage } = data;
              setPass(pass);
              setScorePercentage(score_percentage);
            }
          }
        );
      }
      return;
    }
    if (step < totalSteps - 1) {
      setQuizState("question");
      setTimeLeft(30);
      setStep(step + 1);
    }
  };
  const handleRetry = () => {
    setQuizState("question");
    setSelectedOption(null);
    setExplanation("");
    setTimeLeft(30);
    setTimerActive(true);
    setScore(0);
    setStep(0);
    setSubmissions([]);
    setCanProceed(false);
    router.refresh();
  };

  return (
    <section>
      {!isLoading && (
        <QuizPageLayout
          canProceed={canProceed}
          onPrimaryButtonClick={handleNext}
          onSecondaryButtonClick={handleRetry}
          showSecondaryButton={showSecondaryButton}
          isCompleted={quizState === "complete"}
          primaryButtonText={common.cta_next}
          secondaryButtonText={common.cta_try_again}
        >
          <PageHeader className="sticky top-0 bg-white z-20" />

          <div className="space-y-[var(--core-spacing-lg)] pb-20">
            <QuizStepper
              step={step}
              totalSteps={totalSteps}
              isFinalExam={params && params.lesson_id ? false : true}
            />
          </div>
        </QuizPageLayout>
      )}
    </section>
  );
};
