import axios from "axios";

export const makeRequest = async (config: any): Promise<any> => {
  try {
    const response = await axios(config);

    console.log("API response>>", response);
    return {
      status: response.status,
      statusText: response.statusText,
      success: response.status >= 200 && response.status < 300 ? true : false,
      message: response.data.message || "",
      data: response.data.data || null,
    };
  } catch (error: any) {
    console.log("API response errro>>", error);
    const { status, statusText, data } = error?.response;

    return {
      status,
      statusText,
      success: false,
      message: statusText || data.message || "Unknown Error",
      data: data.data || null,
    };
  }
};
