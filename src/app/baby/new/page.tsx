import { BabyPageNewLayout } from "@/components/clients/BabyPageNewLayout";
import { cookies } from "next/headers";

export default function BabyNewLayout() {
  const cookieStore = cookies();
  return (
    <section>
      <BabyPageNewLayout cookies={cookieStore.getAll()} />
    </section>
  );
}
