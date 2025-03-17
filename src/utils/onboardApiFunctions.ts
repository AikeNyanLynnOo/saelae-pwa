import { makeRequest } from "./makeRequest";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
const authCookieName =
  process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME ||
  process.env.AUTH_COOKIE_NAME ||
  "app_token";

export interface Child {
  name: string;
  is_born: boolean;
  birth_date: string;
  gender: string;
  guardian_role: string;
}

export const completeOnboard = async ({
  name,
  address,
  city,
  date_of_birth,
  children,
  cookies,
}: {
  name: string;
  address: string;
  city: string;
  date_of_birth: string; // YYYY-MM-DD
  children: Child[];
  cookies?: any;
}): Promise<any> => {
  const app_token = cookies[authCookieName] || "";

  const data = {
    name,
    address,
    city,
    date_of_birth,
    children,
  };

  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: `${baseURL}/user/onboard`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${app_token}`,
    },
    data: JSON.stringify(data),
  };
  const res = await makeRequest(config);

  return res;
};
