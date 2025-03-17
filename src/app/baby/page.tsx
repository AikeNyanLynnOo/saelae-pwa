import { BabyPageLayout } from "@/components/clients/BabyPageLayout";
import { cookies } from "next/headers";
export default function BabyProfilePage() {
  const cookieStore = cookies();
  return (
    <section>
      <BabyPageLayout cookies={cookieStore.getAll()} />
    </section>
  );
}
