import { WelcomeLayout } from "@/components/clients/WelcomeLayout";
import { lazy, Suspense } from "react";

export default function WelcomePage() {
  return (
    <section>
      <Suspense fallback={<div></div>}>
        <WelcomeLayout />
      </Suspense>
    </section>
  );
}
