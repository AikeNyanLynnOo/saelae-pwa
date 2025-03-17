import { ProfileEditPageLayout } from "@/components/clients/ProfileEditPageLayout";
import { cookies } from "next/headers";
export default function ProfilePage() {
  const cookieStore = cookies();
  return (
    <section>
      <ProfileEditPageLayout cookies={cookieStore.getAll()} />
    </section>
  );
}
