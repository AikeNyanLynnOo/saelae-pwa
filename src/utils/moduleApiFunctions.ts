import { makeRequest } from "./makeRequest";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
const authCookieName =
  process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || process.env.AUTH_COOKIE_NAME;

export const getInitialModules = async ({
  cookies,
}: {
  cookies?: any;
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
    url: `${baseURL}/modules/initial`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
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
    url: `${baseURL}/modules`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    params: {
      category: category_id,
    },
  };
  const res = await makeRequest(config);

  return res;
};

export const getModuleCategories = async ({
  cookies,
}: {
  cookies?: any;
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
    url: `${baseURL}/categories`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
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
    url: `${baseURL}/modules/${module_id}/lessons`,
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
