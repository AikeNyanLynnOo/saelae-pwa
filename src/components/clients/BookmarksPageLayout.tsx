"use client";
import { useTranslate } from "../hooks/use-translate";
import { ContentHeader } from "@/components/atoms/ContentHeader";
import { LessonCard } from "@/components/atoms/LessonCard";
import { PageHeader } from "@/components/atoms/PageHeader";
import { TabLayout } from "@/components/layouts/TabLayout";
import { useAuthStore } from "@/store/auth-store";
import { useLessonStore } from "@/store/lesson-store";
import { getUserBookmarks, getUserProfile } from "@/utils/userAPIFunctions";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect } from "react";

interface BookmarksPageLayoutProps {
  cookies?: any;
  children?: React.ReactNode;
}

export const BookmarksPageLayout = ({
  cookies,
  children,
}: BookmarksPageLayoutProps) => {
  const clientCookies = parseCookies();
  const router = useRouter();
  const { currentUser, setCurrentUser } = useAuthStore();
  const { bookmarkLessons, setBookmarkLessons } = useLessonStore();
  const { messages, isLoading } = useTranslate();
  const { bookmarks } = messages;

  // fetchUser
  // checkIsValid
  useEffect(() => {
    getUserProfile({ cookies: clientCookies }).then(({ success, data }) => {
      // console.log("User >>", success);
      if (success && data) {
        setCurrentUser((data && data.profile) || null);
      } else {
        router.push("/welcome?session_expired=true");
      }
    });
    getUserBookmarks({ cookies: clientCookies }).then(({ success, data }) => {
      if (success && data) {
        setBookmarkLessons((data && data.lessons) || null);
      }
    });
  }, []);

  console.log("Bookmarks >>", bookmarkLessons);

  return (
    <>
      {!isLoading && (
        <TabLayout>
          <PageHeader className="sticky top-0 bg-white z-20" />
          <ContentHeader
            title={bookmarks.title}
            titleVariant="fontH5Medium"
            titleClassName="text-[var(--semantic-color-text-default)]"
            className="sticky top-[72px] bg-white z-10 gap-0"
          />
          <div className="px-6 space-y-[var(--core-spacing-md)] pb-20">
            {bookmarkLessons.map((lesson, index) => {
              const {
                id,
                module_id,
                media_url,
                title,
                description,
                is_completed,
              } = lesson.lesson || {};
              return (
                <LessonCard
                  key={index}
                  id={id}
                  imageUrl={media_url || ""}
                  moduleId={module_id}
                  title={title}
                  description={description}
                  // state={is_completed ? "completed" : "half-completed"}
                  state="default"
                  showCtaBtn={false}
                />
              );
            })}
          </div>
        </TabLayout>
      )}
    </>
  );
};
