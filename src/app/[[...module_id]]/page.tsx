import { ModulePageLayout } from "@/components/clients/ModulePageLayout";
import { cookies } from "next/headers";
export default function Home({ params }: { params: { module_id: string } }) {
  const cookieStore = cookies();
  const { module_id } = params;

  return (
    <section>
      <ModulePageLayout module_id={module_id && module_id.length > 0 && module_id[0] || ""} cookies={cookieStore.getAll()} />
    </section>
  );
}
