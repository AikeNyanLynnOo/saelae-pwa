import { cookies } from "next/headers";
import { PhoneInputLayout } from "@/components/clients/PhoneInputLayout";

const authCookieName =
  process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || process.env.AUTH_COOKIE_NAME;

export default function AuthPage() {
  const cookieStore = cookies();
  const parseCookies = cookieStore.getAll();
  const authCookies =
    parseCookies && parseCookies.filter((cookie: any) => cookie.name === authCookieName);
  return (
    <section>
      <PhoneInputLayout authCookies={authCookies} />
    </section>
  );
}
