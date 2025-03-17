import { makeRequest } from "./makeRequest";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
const authCookieName =
  process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME ||
  process.env.AUTH_COOKIE_NAME ||
  "";

export const getInitialModules = async ({
  cookies,
}: {
  cookies?: any;
}): Promise<any> => {
  const app_token = cookies[authCookieName] || "";

  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseURL}/modules/initial`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${app_token}`,
    },
  };
  const res = await makeRequest(config);

  return res;
};

export const getModules = async ({
  cookies,
  category_id,
}: {
  cookies?: any;
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
    url: `${baseURL}/modules`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${app_token}`,
    },
    params,
  };
  const res = await makeRequest(config);

  return res;
};

export const getModuleCategories = async ({
  cookies,
}: {
  cookies?: any;
}): Promise<any> => {
  const app_token = cookies[authCookieName] || "";

  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseURL}/categories`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${app_token}`,
    },
  };
  const res = await makeRequest(config);

  return res;
};

export const getModuleLessons = async ({
  cookies,
  module_id,
  category_id,
}: {
  cookies?: any;
  module_id: string;
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
    url: `${baseURL}/modules/${module_id}/lessons`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${app_token}`,
    },
    params,
  };
  const res = await makeRequest(config);

  return res;
};
