import { BookmarksPageLayout } from "@/components/clients/BookmarksPageLayout";
import { cookies } from "next/headers";

export default function BookmarksPage() {
  const cookieStore = cookies();

  return (
    <section>
      <BookmarksPageLayout cookies={cookieStore.getAll()} />
    </section>
  );
}
