import { cookies } from "next/headers";
import { OnboardingLayout } from "@/components/clients/OnboardingLayout";

export default function OnBoardPage() {
  const cookieStore = cookies();
  return (
    <section>
      <OnboardingLayout cookies={cookieStore.getAll()} />
    </section>
  );
}
