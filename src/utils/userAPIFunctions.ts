import { mmCities } from "@/lib/mm_cities";
import { makeRequest } from "./makeRequest";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
const authCookieName =
  process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME ||
  process.env.AUTH_COOKIE_NAME ||
  "app_token";

export const getUserProfile = async ({
  cookies,
}: {
  cookies?: any;
}): Promise<any> => {
  const app_token = cookies[authCookieName] || "";

  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseURL}/user/profile`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${app_token}`,
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
  const app_token = cookies[authCookieName] || "";

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
    url: `${baseURL}/user/profile?_method=PUT`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${app_token}`,
    },
    data: data,
  };
  const res = await makeRequest(config);

  return res;
};

export const getUserBookmarks = async ({
  cookies,
}: {
  cookies?: any;
}): Promise<any> => {
  const app_token = cookies[authCookieName] || "";
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `${baseURL}/user/lessons`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${app_token}`,
    },
  };
  const res = await makeRequest(config);

  return res;
};

export const saveToBookmarks = async ({
  cookies,
  lesson_id,
}: {
  cookies?: any;
  lesson_id?: number;
}): Promise<any> => {
  const app_token = cookies[authCookieName] || "";

  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: `${baseURL}/user/lessons/${lesson_id}/save`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${app_token}`,
    },
  };
  const res = await makeRequest(config);

  return res;
};
export const removeFromBookmarks = async ({
  cookies,
  lesson_id,
}: {
  cookies?: any;
  lesson_id?: number;
}): Promise<any> => {
  const app_token = cookies[authCookieName] || "";

  let config = {
    method: "DELETE",
    maxBodyLength: Infinity,
    url: `${baseURL}/user/lessons/${lesson_id}/remove`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${app_token}`,
    },
  };
  const res = await makeRequest(config);

  return res;
};

export const getCities = async ({
  countryName,
}: {
  countryName?: string;
}): Promise<any> => {
  if (countryName === "Myanmar") {
    return {
      status: 200,
      statusText: "OK",
      success: true,
      message: "Cities fetched successfully",
      data: mmCities,
    };
  }
  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: `https://countriesnow.space/api/v0.1/countries/cities`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      country: countryName,
    },
  };
  const res = await makeRequest(config);

  return res;
};
