import { makeRequest } from "./makeRequest";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
const authCookieName =
  process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME ||
  process.env.AUTH_COOKIE_NAME ||
  "app_token";

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
  const app_token = cookies[authCookieName] || "";
  const params: any = {};
  if (category_id) {
    params["category"] = category_id;
  }

  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseURL}/modules/${module_id}/lessons/${lesson_id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${app_token}`,
    },
    params,
  };
  const res = await makeRequest(config);

  return res;
};
