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
import { useEffect } from "react";

interface BookmarksPageLayoutProps {
  cookies?: any;
  children?: React.ReactNode;
}

export const BookmarksPageLayout = ({
  cookies,
  children,
}: BookmarksPageLayoutProps) => {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useAuthStore();
  const { bookmarkLessons, setBookmarkLessons } = useLessonStore();
  const { messages, isLoading } = useTranslate();
  const { bookmarks } = messages;

  // fetchUser
  // checkIsValid
  useEffect(() => {
    getUserProfile({ cookies }).then(({ success, data }) => {
      // console.log("User >>", success);
      if (success && data) {
        setCurrentUser((data && data.profile) || null);
      } else {
        router.push("/auth?session_expired=true");
      }
    });
    getUserBookmarks({ cookies }).then(({ success, data }) => {
      if (success && data) {
        setBookmarkLessons((data && data.lessons) || null);
      }
    });
  }, [cookies]);

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
            {bookmarkLessons.map((lesson, index) => (
              <LessonCard
                key={index}
                id={lesson.id}
                moduleId={lesson.module_id}
                title={lesson.title}
                description={lesson.description}
                state={lesson.is_completed ? "completed" : "half-completed"}
              />
            ))}
          </div>
        </TabLayout>
      )}
    </>
  );
};
