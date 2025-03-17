import { QuizPageLayoutWrapper } from "@/components/clients/QuizPageLayoutWrapper";
import { cookies } from "next/headers";

export default function LessonPage() {
  const cookieStore = cookies();

  return <QuizPageLayoutWrapper cookies={cookieStore.getAll()} />;
}
