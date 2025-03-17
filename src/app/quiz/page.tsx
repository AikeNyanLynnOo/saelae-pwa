import { QuizPageLayoutWrapper } from "@/components/clients/QuizPageLayoutWrapper";
import { cookies } from "next/headers";

export default function QuizPage() {
  const cookieStore = cookies();

  return <QuizPageLayoutWrapper cookies={cookieStore.getAll()} />;
}
