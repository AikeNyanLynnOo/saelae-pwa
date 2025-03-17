"use client";
import { useEffect } from "react";
import { useState } from "react";
import { LessonCard } from "@/components/atoms/LessonCard";
import { CommonLayout } from "@/components/layouts/CommonLayout";
import { SLTypo } from "@/components/SLTypo";
import { useTranslate } from "../hooks/use-translate";
import { useFetchData } from "../hooks/use-fetch-data";
import { getInitialModules } from "@/utils/moduleApiFunctions";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

interface PersonalizationLayoutProps {
  cookies?: any;
}
export const PersonalizationLayout = ({
  cookies,
}: PersonalizationLayoutProps) => {
  const clientCookies = parseCookies();
  const router = useRouter();
  const { messages, isLoading } = useTranslate();
  const { personalize } = messages;
  // const [apiLoading, setApiLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setApiLoading(false);
  //   }, 6000);
  // }, []);

  const { status, statusText, success, message, data, loading, error } =
    useFetchData({
      fetcher: getInitialModules,
      args: {
        cookies: clientCookies,
      },
      deps: [],
      redirect: {
        status: 404,
        path: "/onboard?profile=incomplete",
      },
    });

  return (
    <CommonLayout isLoading={isLoading || loading}>
      <div className="space-y-[var(--core-spacing-xl)] pb-12 w-full md:w-4/6 lg:w-3/6 mx-auto min-h-[100dvh] max-h-[100vh] overflow-y-scroll relative hide-scrollbar">
        <div className="pt-10 px-4 lg:px-0">
          {/* Title */}
          <SLTypo
            as="h3"
            text={personalize.title}
            variant="fontH3Medium"
            className="text-center text-[var(--semantic-color-text-default)] mb-4 px-4 lg:px-0"
          />

          {/* Description */}
          <SLTypo
            as="p"
            text={personalize.text}
            variant="fontBody3Normal"
            className="text-center text-[var(--semantic-color-text-subtle)] px-4 lg:px-0"
          />
        </div>

        {data && data.recommended && data.recommended.length > 0 && (
          <div className="px-4 lg:px-0 w-fit mx-auto">
            <SLTypo
              as="h6"
              text={personalize.priority_lesson}
              variant="fontH6Semibold"
              className="text-[var(--semantic-color-text-default)] mb-[var(--core-spacing-lg)] text-left"
            />
            <div className="flex flex-col gap-[var(--core-spacing-lg)]">
              {data.recommended.map((data: any, index: number) => (
                <LessonCard
                  key={index}
                  title={data.title || ""}
                  imageUrl={data.media_url || ""}
                  description={data.description || ""}
                  totalLessons={data.total_lessons_count || ""}
                  state="default"
                  onButtonClick={() => router.push(`/${data.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {data && data.normal && data.normal.length > 0 && (
          <div className="px-4 lg:px-0 w-fit mx-auto">
            <SLTypo
              as="h6"
              text={personalize.other_lesson}
              variant="fontH6Semibold"
              className="text-[var(--semantic-color-text-default)] mb-[var(--core-spacing-lg)] text-left"
            />
            <div className="flex flex-col gap-[var(--core-spacing-lg)]">
              {data.normal.map((data: any, index: number) => (
                <LessonCard
                  key={index}
                  title={data.title || ""}
                  imageUrl={data.media_url || ""}
                  description={data.description || ""}
                  totalLessons={data.total_lessons_count || ""}
                  state="default"
                  onButtonClick={() => router.push(`/${data.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </CommonLayout>
  );
};
