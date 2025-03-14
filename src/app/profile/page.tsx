import { ProfilePageLayout } from "@/components/clients/ProfilePageLayout";
import { cookies } from "next/headers";
export default function ProfilePage() {
  const cookieStore = cookies();
  return (
    <section>
      <ProfilePageLayout cookies={cookieStore.getAll()} />
    </section>
  );
}
