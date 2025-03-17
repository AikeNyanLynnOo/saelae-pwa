import { makeRequest } from "./makeRequest";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
const authCookieName =
  process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME ||
  process.env.AUTH_COOKIE_NAME ||
  "app_token";

export const getLessonQuiz = async ({
  cookies,
  module_id,
  lesson_id,
}: {
  cookies?: any;
  module_id: string;
  lesson_id: string;
}): Promise<any> => {
  const app_token = cookies[authCookieName] || "";
  const params: any = {};

  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseURL}/modules/${module_id}/lessons/${lesson_id}/quiz`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${app_token}`,
    },
    params,
  };
  const res = await makeRequest(config);

  return res;
};
export const getModuleQuiz = async ({
  cookies,
  module_id,
}: {
  cookies?: any;
  module_id: string;
}): Promise<any> => {
  const app_token = cookies[authCookieName] || "";
  const params: any = {};

  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseURL}/modules/${module_id}/quiz`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${app_token}`,
    },
    params,
  };
  const res = await makeRequest(config);

  return res;
};

export const submitLessonQuiz = async ({
  cookies,
  module_id,
  lesson_id,
  submissions,
}: {
  cookies?: any;
  module_id: string;
  lesson_id: string;
  submissions: any[];
}): Promise<any> => {
  const app_token = cookies[authCookieName] || "";
  const params: any = {};

  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: `${baseURL}/modules/${module_id}/lessons/${lesson_id}/quiz`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${app_token}`,
    },
    data: { submissions },
  };
  const res = await makeRequest(config);

  return res;
};
export const submitModuleQuiz = async ({
  cookies,
  module_id,
  submissions,
}: {
  cookies?: any;
  module_id: string;
  submissions: any[];
}): Promise<any> => {
  const app_token = cookies[authCookieName] || "";
  const params: any = {};

  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: `${baseURL}/modules/${module_id}/quiz`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${app_token}`,
    },
    data: { submissions },
  };
  const res = await makeRequest(config);

  return res;
};
