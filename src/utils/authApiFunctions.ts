import { makeRequest } from "./makeRequest";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
const authCookieName =
  process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME ||
  process.env.AUTH_COOKIE_NAME ||
  "app_token";

export const requestOtp = async ({
  phone_number,
  country_code,
}: {
  phone_number?: string;
  country_code?: string;
}): Promise<any> => {
  const data = {
    phone_number,
    country_code,
  };
  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: `${baseURL}/otp/request`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  const res = await makeRequest(config);

  return res;
};
export const verifyOtp = async ({
  phone_number,
  otp,
}: {
  phone_number?: string;
  otp?: string;
}): Promise<any> => {
  const data = {
    phone_number,
    otp,
  };
  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: `${baseURL}/otp/verify`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  const res = await makeRequest(config);

  return res;
};
export const logout = async ({ cookies }: { cookies?: any }): Promise<any> => {
  const app_token = cookies[authCookieName] || "";
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseURL}/user/logout`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${app_token}`,
    },
  };
  const res = await makeRequest(config);

  return res;
};
