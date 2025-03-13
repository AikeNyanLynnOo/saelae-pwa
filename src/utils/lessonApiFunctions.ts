import { makeRequest } from "./makeRequest";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
const authCookieName =
  process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || process.env.AUTH_COOKIE_NAME;

export const getLesson = async ({
  cookies,
  module_id,
  lesson_id,
  category_id,
}: {
  cookies?: any;
  module_id: string;
  lesson_id: string;
  category_id?: string;
}): Promise<any> => {
  const authCookies =
    cookies && cookies.filter((cookie: any) => cookie.name === authCookieName);
  const authToken =
    (authCookies &&
      Array.isArray(authCookies) &&
      authCookies.length > 0 &&
      authCookies[0]?.value) ||
    "";

  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseURL}/modules/${module_id}/lessons/${lesson_id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    params: {
      category_id,
    },
  };
  const res = await makeRequest(config);

  return res;
};
