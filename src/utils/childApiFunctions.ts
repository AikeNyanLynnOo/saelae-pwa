import { makeRequest } from "./makeRequest";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
const authCookieName =
  process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || process.env.AUTH_COOKIE_NAME;

export const getChildren = async ({
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
    url: `${baseURL}/user/children`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };
  const res = await makeRequest(config);

  return res;
};

export const getChild = async ({
  id,
  cookies,
}: {
  id: number;
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
    url: `${baseURL}/user/children/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };
  const res = await makeRequest(config);

  return res;
};

export const addChild = async ({
  name,
  is_born,
  birth_date,
  gender,
  guardian_role,
  media_file,
  cookies,
}: {
  name: string;
  is_born: boolean;
  birth_date: string;
  gender: string;
  guardian_role: string;
  media_file?: any;
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

  let data = new FormData();
  data.append("name", name);
  data.append("birth_date", birth_date);
  data.append("is_born", (is_born && "1") || "0");
  data.append("gender", gender);
  if (media_file) {
    data.append("media_file", media_file);
  }
  data.append("guardian_role", guardian_role);

  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: `${baseURL}/user/children`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${authToken}`,
    },
    data,
  };
  const res = await makeRequest(config);

  return res;
};

export const updateChild = async ({
  id,
  name,
  is_born,
  birth_date,
  gender,
  guardian_role,
  media_file,
  cookies,
}: {
  id: number;
  name: string;
  is_born: boolean;
  birth_date: string;
  gender: string;
  guardian_role: string;
  media_file?: any;
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

  let data = new FormData();
  data.append("name", name);
  data.append("birth_date", birth_date);
  data.append("is_born", (is_born && "1") || "0");
  data.append("gender", gender);
  if (media_file) {
    data.append("media_file", media_file);
  }
  data.append("guardian_role", guardian_role);

  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: `${baseURL}/user/children/${id}?_method=PUT`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${authToken}`,
    },
    data,
  };
  const res = await makeRequest(config);

  return res;
};
export const deleteChild = async ({
  id,
  cookies,
}: {
  id: number;
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
    method: "DELETE",
    maxBodyLength: Infinity,
    url: `${baseURL}/user/children/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };
  const res = await makeRequest(config);

  return res;
};
