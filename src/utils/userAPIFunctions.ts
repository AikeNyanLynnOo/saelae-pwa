import { makeRequest } from "./makeRequest";
import { Child } from "./onboardApiFunctions";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
const authCookieName =
  process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || process.env.AUTH_COOKIE_NAME;

export const getUserProfile = async ({
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
    url: `${baseURL}/user/profile`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };
  const res = await makeRequest(config);

  return res;
};

export const updateProfile = async ({
  name,
  address,
  city,
  date_of_birth,
  media_file,
  cookies,
}: {
  name: string;
  address: string;
  city: string;
  date_of_birth: string; // YYYY-MM-DD
  media_file: any;
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
  data.append("address", address);
  data.append("city", city);
  data.append("date_of_birth", date_of_birth);
  if (media_file) {
    data.append("media_file", media_file);
  }

  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: `${baseURL}/user/update?method=PUT`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${authToken}`,
    },
  };
  const res = await makeRequest(config);

  return res;
};
