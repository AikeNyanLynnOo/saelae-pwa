import { BabyPageEditLayout } from "@/components/clients/BabyPageEditLayout";
import { cookies } from "next/headers";

export default function BabyProfilePage() {
  const cookieStore = cookies();
  return (
    <section>
      <BabyPageEditLayout cookies={cookieStore.getAll()} />
    </section>
  );
}
