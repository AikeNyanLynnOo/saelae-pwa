import { LessonPageLayoutWrapper } from "@/components/clients/LessonPageLayoutWrapper";
import { cookies } from "next/headers";

export default function LessonPage() {
  const cookieStore = cookies();

  return <LessonPageLayoutWrapper cookies={cookieStore.getAll()} />;
}
