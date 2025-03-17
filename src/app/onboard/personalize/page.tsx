import { PersonalizationLayout } from "@/components/clients/PersonalizationLayout";
import { cookies } from "next/headers";

export default function PersonalizationPage() {
  const cookieStore = cookies();

  return (
    <section>
      <PersonalizationLayout cookies={cookieStore.getAll()} />
    </section>
  );
}
