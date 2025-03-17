import { cookies } from "next/headers";
import { ModulesPageLayout } from "@/components/clients/ModulesPageLayout";

export default function ModulesPage() {
  const cookieStore = cookies();

  return <ModulesPageLayout cookies={cookieStore.getAll()} />;
}
