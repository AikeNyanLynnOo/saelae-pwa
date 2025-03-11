import { makeRequest } from "./makeRequest";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
const authCookieName =
  process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || process.env.AUTH_COOKIE_NAME;

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
